import requests
import json

# URL de la API
url = 'http://192.168.0.199/api/all/all/now'

# Realizar una solicitud GET a la API
response = requests.get(url)

# Verificar si la solicitud fue exitosa (código de estado 200)
if response.status_code == 200:
    # Obtener la respuesta en formato JSON
    data = response.json()

    # Formatear la salida JSON con sangría y orden
    formatted_data = json.dumps(data, indent=4)

    # Imprimir el JSON formateado
    print(formatted_data)
else:
    print(f'Error al obtener los datos de la API. Código de estado: {response.status_code}')
