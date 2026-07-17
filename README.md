# Desafio Técnico Claro - Sistema de Pedidos

## Pré-requisitos

Necessário possuir instalado:

* Docker
* Docker Compose

Validar instalação:

```bash
docker --version
docker compose version
```

---

# Estrutura do projeto

```text
desafio-tecnico-claro/
│
├── pedidos_backend/
│   ├── compose.yaml
│   ├── Dockerfile
│   ├── prometheus.yml
│   ├── grafana/
│   └── src/
│
└── pedidos_frontend/
    └── src/
```

---

# Executando a aplicação completa

O projeto utiliza Docker Compose para iniciar todos os serviços necessários:

* Backend Spring Boot
* Frontend Angular
* PostgreSQL
* Prometheus
* Grafana

Entre na pasta do backend:

```bash
cd pedidos_backend
```

Execute:

```bash
docker compose up --build
```

O Docker irá criar e iniciar todos os containers automaticamente.

---

# Serviços disponíveis

Após a inicialização:

| Serviço          | URL                                         | Porta |
| ---------------- | ------------------------------------------- | ----- |
| Frontend Angular | http://localhost:4200                       | 4200  |
| Backend API      | http://localhost:8080                       | 8080  |
| Swagger          | http://localhost:8080/swagger-ui/index.html | 8080  |
| PostgreSQL       | localhost:5432                              | 5432  |
| Prometheus       | http://localhost:9090                       | 9090  |
| Grafana          | http://localhost:3000                       | 3000  |

---

# Monitoramento

A aplicação possui observabilidade utilizando:

* Spring Boot Actuator
* Prometheus
* Grafana

Endpoints:

Health Check:

```
http://localhost:8080/actuator/health
```

Métricas:

```
http://localhost:8080/actuator/prometheus
```

Grafana:

```
http://localhost:3000
```

Prometheus:

```
http://localhost:9090
```

# Observação

O frontend é construído automaticamente pelo Docker utilizando o Dockerfile localizado em `pedidos_frontend`.

Não é necessário instalar Node.js ou executar `npm install` para executar a aplicação em produção.
