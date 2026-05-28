import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const payload = JSON.stringify({
    email: `load-${__VU}-${__ITER}@example.com`,
    firstName: 'Load',
    lastName: 'Tester',
    password: 'Strong1!',
  });

  const headers = { 'Content-Type': 'application/json' };
  const response = http.post('http://localhost:8080/api/v1/customers/register', payload, { headers });

  check(response, {
    'status is 201, 400, or 429': (r) => [201, 400, 429].includes(r.status),
  });

  sleep(0.1);
}
