import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { EnvioService, EnvioSummary } from '../../../core/services/envio.service';
import { CustomerService, CustomerSummary } from '../../../core/services/customer.service';
import { ProductService, ProductSummary } from '../../../core/services/product.service';

@Component({
  selector: 'app-envio-list',
  templateUrl: './envio-list.component.html',
  styleUrls: ['./envio-list.component.css'],
})
export class EnvioListComponent implements OnInit, AfterViewInit, OnDestroy {
  envios: EnvioSummary[] = [];
  customers: CustomerSummary[] = [];
  products: ProductSummary[] = [];

  loading = true;
  error = '';

  searchTerm = '';
  filterPais = '';
  filterCodigoPostal = '';
  showNewPanel = false;
  showEditPanel = false;

  selectedCustomerId = '';
  selectedProductId: number | null = null;
  direccionEnvio = '';
  codigoPostal = '';
  pais = '';
  creating = false;
  createError = '';

  editingEnvioId: number | null = null;
  editDireccionEnvio = '';
  editCodigoPostal = '';
  editPais = '';
  editEstado = 'pendiente';
  editError = '';
  savingEdit = false;

  showMapModal = false;
  mapAddress = '';
  showSimulationModal = false;
  simulationEnvio: EnvioSummary | null = null;
  readonly simulationOrigin = 'Guadalajara, España';
  readonly simulationDurationHours = 48;
  readonly simulationOriginCoords: L.LatLngExpression = [40.6333, -3.1667];
  simulationDistanceKm: number | null = null;
  simulationNowMs = Date.now();
  private simulationTimerId: ReturnType<typeof setInterval> | null = null;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('simulationMapContainer') simulationMapContainer!: ElementRef;
  map: L.Map | null = null;
  simulationMap: L.Map | null = null;

  constructor(
    private readonly envioService: EnvioService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.customerService.getAll().subscribe({ next: (data) => (this.customers = data), error: () => {} });
    this.productService.getAll().subscribe({ next: (data) => (this.products = data), error: () => {} });
  }

  ngAfterViewInit(): void {
    // Map will be initialized when modal opens
  }

  ngOnDestroy(): void {
    if (this.simulationTimerId) {
      clearInterval(this.simulationTimerId);
      this.simulationTimerId = null;
    }
  }

  private loadAll(): void {
    this.loading = true;
    this.error = '';
    this.envioService.getAll().subscribe({
      next: (data) => { this.envios = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar los envíos.'; this.loading = false; },
    });
  }

  get filteredEnvios(): EnvioSummary[] {
    const term = this.searchTerm.toLowerCase().trim();
    const pais = this.filterPais.toLowerCase().trim();
    const codigoPostal = this.filterCodigoPostal.toLowerCase().trim();

    return this.envios.filter(e => {
      const matchTerm = !term ||
        e.customerNombre.toLowerCase().includes(term) ||
        e.productNombre.toLowerCase().includes(term) ||
        e.direccionEnvio.toLowerCase().includes(term) ||
        e.codigoPostal.toLowerCase().includes(term) ||
        e.pais.toLowerCase().includes(term) ||
        e.estado.toLowerCase().includes(term);

      const matchPais = !pais || e.pais.toLowerCase().includes(pais);
      const matchCodigoPostal = !codigoPostal || e.codigoPostal.toLowerCase().includes(codigoPostal);

      return matchTerm && matchPais && matchCodigoPostal;
    });
  }

  openNewPanel(): void {
    this.selectedCustomerId = '';
    this.selectedProductId = null;
    this.direccionEnvio = '';
    this.codigoPostal = '';
    this.pais = '';
    this.createError = '';
    this.showNewPanel = true;
  }

  cancelNew(): void {
    this.showNewPanel = false;
  }

  openEditPanel(envio: EnvioSummary): void {
    this.editingEnvioId = envio.envioId;
    this.editDireccionEnvio = envio.direccionEnvio;
    this.editCodigoPostal = envio.codigoPostal;
    this.editPais = envio.pais;
    this.editEstado = envio.estado;
    this.editError = '';
    this.showEditPanel = true;
  }

  cancelEdit(): void {
    this.showEditPanel = false;
    this.editingEnvioId = null;
  }

  submitEdit(): void {
    if (!this.editingEnvioId) {
      return;
    }
    if (!this.editDireccionEnvio.trim() || !this.editCodigoPostal.trim() || !this.editPais.trim() || !this.editEstado.trim()) {
      this.editError = 'Completa dirección, código postal, país y estado.';
      return;
    }

    this.savingEdit = true;
    this.editError = '';
    this.envioService.update(this.editingEnvioId, {
      direccionEnvio: this.editDireccionEnvio.trim(),
      codigoPostal: this.editCodigoPostal.trim(),
      pais: this.editPais.trim(),
      estado: this.editEstado.trim(),
    }).subscribe({
      next: () => {
        this.savingEdit = false;
        this.showEditPanel = false;
        this.editingEnvioId = null;
        this.loadAll();
      },
      error: () => {
        this.savingEdit = false;
        this.editError = 'Error al actualizar el envío. Inténtalo de nuevo.';
      },
    });
  }

  submitNew(): void {
    if (!this.selectedCustomerId || !this.selectedProductId || !this.direccionEnvio.trim() || !this.codigoPostal.trim() || !this.pais.trim()) {
      this.createError = 'Completa usuario, producto, dirección, código postal y país.';
      return;
    }
    this.creating = true;
    this.createError = '';
    this.envioService.create({
      customerId: this.selectedCustomerId,
      productId: this.selectedProductId,
      direccionEnvio: this.direccionEnvio.trim(),
      codigoPostal: this.codigoPostal.trim(),
      pais: this.pais.trim(),
    }).subscribe({
      next: () => {
        this.creating = false;
        this.showNewPanel = false;
        this.loadAll();
      },
      error: () => {
        this.createError = 'Error al crear el envío. Inténtalo de nuevo.';
        this.creating = false;
      },
    });
  }

  estadoLabel(estado: string): string {
    const map: Record<string, string> = {
      pendiente: 'Pendiente',
      enviado: 'Enviado',
      entregado: 'Entregado',
      cancelado: 'Cancelado',
    };
    return map[estado] ?? estado;
  }

  openMapModal(envio: EnvioSummary): void {
    this.mapAddress = `${envio.direccionEnvio}, ${envio.codigoPostal}, ${envio.pais}`;
    this.showMapModal = true;
    setTimeout(() => this.initializeMap(envio), 100);
  }

  private initializeMap(envio: EnvioSummary): void {
    const mapElement = this.mapContainer?.nativeElement;
    if (!mapElement) return;

    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.map = L.map(mapElement).setView([40.4637, -3.7492], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    const postalCodeQuery = `${envio.codigoPostal.trim()}, España`;
    this.geocodePostalCode(postalCodeQuery);
  }

  private geocodePostalCode(postalCodeQuery: string): void {
    if (!this.map) return;

    const url = `https://nominatim.openstreetmap.org/search?country=Spain&postalcode=${encodeURIComponent(postalCodeQuery.replace(', España', ''))}&format=jsonv2&limit=1`;
    
    this.http.get<any[]>(url).subscribe({
      next: (results) => {
        if (results && results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lon = parseFloat(results[0].lon);
          this.map?.setView([lat, lon], 15);
          L.marker([lat, lon])
            .bindPopup(postalCodeQuery)
            .addTo(this.map!)
            .openPopup();
        } else {
          this.showSpainFallback();
        }
      },
      error: () => {
        this.showSpainFallback();
      },
    });
  }

  private showSpainFallback(): void {
    if (!this.map) return;

    this.map.setView([40.4637, -3.7492], 6);
  }

  closeMapModal(): void {
    this.showMapModal = false;
    this.mapAddress = '';
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  openSimulationModal(envio: EnvioSummary): void {
    this.simulationEnvio = envio;
    this.simulationDistanceKm = null;
    this.showSimulationModal = true;
    this.simulationNowMs = Date.now();
    if (this.simulationTimerId) {
      clearInterval(this.simulationTimerId);
    }
    this.simulationTimerId = setInterval(() => {
      this.simulationNowMs = Date.now();
    }, 1000);
    setTimeout(() => this.initializeSimulationMap(envio), 100);
  }

  closeSimulationModal(): void {
    this.showSimulationModal = false;
    this.simulationEnvio = null;
    this.simulationDistanceKm = null;
    if (this.simulationTimerId) {
      clearInterval(this.simulationTimerId);
      this.simulationTimerId = null;
    }
    if (this.simulationMap) {
      this.simulationMap.remove();
      this.simulationMap = null;
    }
  }

  get simulationDeparture(): Date {
    const source = this.simulationEnvio?.fechaEnvio;
    const parsed = source ? new Date(source) : new Date();
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  get simulationEta(): Date {
    const eta = new Date(this.simulationDeparture);
    eta.setHours(eta.getHours() + this.simulationDurationHours);
    return eta;
  }

  get simulationProgressPercent(): number {
    const elapsedMs = this.simulationNowMs - this.simulationDeparture.getTime();
    const durationMs = this.simulationDurationHours * 60 * 60 * 1000;
    const ratio = elapsedMs / durationMs;
    return Math.max(0, Math.min(100, Math.round(ratio * 100)));
  }

  get simulationStatusLabel(): string {
    if (this.simulationProgressPercent >= 100) {
      return 'Entregado (simulación)';
    }
    return 'En tránsito (simulación)';
  }

  get simulationRemainingLabel(): string {
    const remainingMs = this.simulationEta.getTime() - this.simulationNowMs;
    if (remainingMs <= 0) {
      return '0h 0m';
    }

    const totalMinutes = Math.floor(remainingMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  private initializeSimulationMap(envio: EnvioSummary): void {
    const mapElement = this.simulationMapContainer?.nativeElement;
    if (!mapElement) return;

    if (this.simulationMap) {
      this.simulationMap.remove();
      this.simulationMap = null;
    }

    this.simulationMap = L.map(mapElement).setView(this.simulationOriginCoords, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.simulationMap);

    L.marker(this.simulationOriginCoords)
      .bindPopup(`Origen: ${this.simulationOrigin}`)
      .addTo(this.simulationMap)
      .openPopup();

    const postalCodeQuery = `${envio.codigoPostal.trim()}, España`;
    const url = `https://nominatim.openstreetmap.org/search?country=Spain&postalcode=${encodeURIComponent(envio.codigoPostal.trim())}&format=jsonv2&limit=1`;

    this.http.get<any[]>(url).subscribe({
      next: (results) => {
        if (!this.simulationMap) {
          return;
        }

        if (results && results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lon = parseFloat(results[0].lon);
          const destinationCoords: L.LatLngExpression = [lat, lon];
          this.simulationDistanceKm = this.calculateDistanceKm(
            this.simulationOriginCoords,
            destinationCoords,
          );

          L.marker(destinationCoords)
            .bindPopup(`Destino: ${postalCodeQuery}`)
            .addTo(this.simulationMap);

          const route = L.polyline([this.simulationOriginCoords, destinationCoords], {
            color: '#2563eb',
            weight: 4,
            opacity: 0.9,
            dashArray: '8 6',
          }).addTo(this.simulationMap);

          this.simulationMap.fitBounds(route.getBounds(), { padding: [24, 24] });
        } else {
          this.simulationDistanceKm = null;
          this.simulationMap.setView(this.simulationOriginCoords, 6);
        }
      },
      error: () => {
        this.simulationDistanceKm = null;
        this.simulationMap?.setView(this.simulationOriginCoords, 6);
      },
    });
  }

  private calculateDistanceKm(from: L.LatLngExpression, to: L.LatLngExpression): number {
    const fromArray = from as [number, number];
    const toArray = to as [number, number];

    const lat1 = fromArray[0] * (Math.PI / 180);
    const lon1 = fromArray[1] * (Math.PI / 180);
    const lat2 = toArray[0] * (Math.PI / 180);
    const lon2 = toArray[1] * (Math.PI / 180);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const earthRadiusKm = 6371;

    return Math.round(earthRadiusKm * c);
  }
}
