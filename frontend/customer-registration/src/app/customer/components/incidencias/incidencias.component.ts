import { Component, OnInit } from '@angular/core';
import { IncidenciaService, IncidenciaSummary } from '../../../core/services/incidencia.service';
import { EnvioService, EnvioSummary } from '../../../core/services/envio.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css'],
})
export class IncidenciasComponent implements OnInit {
  incidencias: IncidenciaSummary[] = [];
  envios: EnvioSummary[] = [];
  loading = true;
  error = '';
  filterEstado = '';
  filterEnvioId: number | null = null;
  deletingId: number | null = null;

  showNewPanel = false;
  showEditPanel = false;
  createError = '';
  editError = '';
  creating = false;
  savingEdit = false;

  selectedEnvioId: number | null = null;
  tipo = 'incidencia';
  estado = 'abierta';
  descripcion = '';

  editingIncidenciaId: number | null = null;
  editTipo = 'incidencia';
  editEstado = 'abierta';
  editDescripcion = '';

  constructor(
    private readonly incidenciaService: IncidenciaService,
    private readonly envioService: EnvioService,
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.envioService.getAll().subscribe({
      next: (data) => (this.envios = data),
      error: () => {},
    });
  }

  private loadAll(): void {
    this.loading = true;
    this.error = '';
    this.incidenciaService.getAll().subscribe({
      next: (data) => {
        this.incidencias = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las incidencias.';
        this.loading = false;
      },
    });
  }

  get filteredIncidencias(): IncidenciaSummary[] {
    const estado = this.filterEstado.trim().toLowerCase();
    return this.incidencias.filter((item) => {
      const matchEstado = !estado || item.estado.toLowerCase() === estado;
      const matchEnvio = !this.filterEnvioId || item.envioId === this.filterEnvioId;
      return matchEstado && matchEnvio;
    });
  }

  openNewPanel(): void {
    this.selectedEnvioId = null;
    this.tipo = 'incidencia';
    this.estado = 'abierta';
    this.descripcion = '';
    this.createError = '';
    this.showNewPanel = true;
  }

  cancelNew(): void {
    this.showNewPanel = false;
  }

  submitNew(): void {
    if (!this.selectedEnvioId || !this.tipo.trim() || !this.estado.trim() || !this.descripcion.trim()) {
      this.createError = 'Completa envío, tipo, estado y descripción.';
      return;
    }

    this.creating = true;
    this.createError = '';
    this.incidenciaService.create({
      envioId: this.selectedEnvioId,
      tipo: this.tipo.trim().toLowerCase(),
      estado: this.estado.trim().toLowerCase(),
      descripcion: this.descripcion.trim(),
    }).subscribe({
      next: () => {
        this.creating = false;
        this.showNewPanel = false;
        this.loadAll();
      },
      error: () => {
        this.creating = false;
        this.createError = 'Error al crear la incidencia. Revisa los datos e inténtalo de nuevo.';
      },
    });
  }

  openEditPanel(item: IncidenciaSummary): void {
    this.editingIncidenciaId = item.incidenciaId;
    this.editTipo = item.tipo;
    this.editEstado = item.estado;
    this.editDescripcion = item.descripcion;
    this.editError = '';
    this.showEditPanel = true;
  }

  cancelEdit(): void {
    this.showEditPanel = false;
    this.editingIncidenciaId = null;
  }

  submitEdit(): void {
    if (!this.editingIncidenciaId) {
      return;
    }
    if (!this.editTipo.trim() || !this.editEstado.trim() || !this.editDescripcion.trim()) {
      this.editError = 'Completa tipo, estado y descripción.';
      return;
    }

    this.savingEdit = true;
    this.editError = '';
    this.incidenciaService.update(this.editingIncidenciaId, {
      tipo: this.editTipo.trim().toLowerCase(),
      estado: this.editEstado.trim().toLowerCase(),
      descripcion: this.editDescripcion.trim(),
    }).subscribe({
      next: () => {
        this.savingEdit = false;
        this.showEditPanel = false;
        this.editingIncidenciaId = null;
        this.loadAll();
      },
      error: () => {
        this.savingEdit = false;
        this.editError = 'Error al actualizar la incidencia. Inténtalo de nuevo.';
      },
    });
  }

  deleteIncidencia(item: IncidenciaSummary): void {
    if (!confirm(`¿Seguro que quieres eliminar la incidencia #${item.incidenciaId}?`)) {
      return;
    }

    this.deletingId = item.incidenciaId;
    this.incidenciaService.delete(item.incidenciaId).subscribe({
      next: () => {
        this.deletingId = null;
        this.incidencias = this.incidencias.filter((x) => x.incidenciaId !== item.incidenciaId);
      },
      error: () => {
        this.deletingId = null;
        this.error = 'Error al eliminar la incidencia.';
      },
    });
  }
}
