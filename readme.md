# Projeto de Monitoramento e Deploy em Kubernetes

Este projeto consiste numa aplicação Node.js (API) containerizada com Docker, orquestrada por Kubernetes, com suporte de base de dados (Redis), monitorização completa (Prometheus/Grafana) e um pipeline de CI/CD (Jenkins).

## Estrutura do Projeto

* **Aplicação:** API Node.js com endpoint de stress (Cálculo de Fatorial).
* **Kubernetes:** 4 réplicas da aplicação para alta disponibilidade.
* **Base de Dados:** Redis configurado via ClusterIP.
* **Monitorização:** Prometheus para coleta de métricas e Grafana para dashboards.
* **Persistência:** PVC (Persistent Volume Claim) para os dados do Prometheus.

## Portas e Acessos

| Serviço | Tipo | Porta Externa | Acesso |
| :--- | :--- | :--- | :--- |
| **Aplicação** | NodePort | `30001` | `http://localhost:30001` |
| **Grafana** | NodePort | `30002` | `http://localhost:30002` |
| **Prometheus** | ClusterIP | `9090` | Apenas Interno |
| **Redis** | ClusterIP | `6379` | Apenas Interno |

## 📦 Como rodar o projeto

### 1. Build da Imagem
```bash
docker build -t SEU_USUARIO/hello-dka-app:v1 .
docker push SEU_USUARIO/hello-dka-app:v1
```

### 2. Deploy no Kubernetes
Aplique os manifestos na seguinte ordem:
```bash
kubectl apply -f deployment.yaml
kubectl apply -f services.yaml
kubectl apply -f monitoring.yaml
kubectl apply -f prometheus-svc.yaml
```

## Teste de Stress
Para validar o funcionamento dos gráficos de CPU e Memória no Grafana, utilize o endpoint de stress:
```bash
# No PowerShell
while($true) { iwr -UseBasicParsing http://localhost:30001/stress; echo "Carga enviada!" }
```
ou

```bash
docker run --rm jordi/ab -n 10000 -c 100 http://host.docker.internal:30001/stress
```

## Monitorização (Grafana)
* **Login:** `admin` / **Senha:** `admin`
* **Dashboards:** Configurados para exibir consumo de CPU e Memória por Pod através da integração com o Prometheus (`http://prometheus-service:9090`).


<br/>
<br/>

###### Desenvolvido para fins acadêmicos.