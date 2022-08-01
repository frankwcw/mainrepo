/// tutoiral https://blog.yowko.com/grpc-load-test-k6/
/// k6 run --vus 100 --duration 3s k6-script.js
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3001');
  sleep(1);
}
