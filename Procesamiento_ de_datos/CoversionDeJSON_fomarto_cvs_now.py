import requests
import json
import csv
from datetime import datetime

def data_export_api_now(nombre_archivo='datos_exportados.json'):
    api ='http://192.168.0.199/api/all/all/now'
    try:
        # Realizar la solicitud GET
        response = requests.get(api)

        # Verificar si la solicitud fue exitosa (código de estado 200)
        response.raise_for_status()

        # Convertir la respuesta a formato JSON si la API devuelve JSON
        data = response.json()
        # modificar la hora
        for time in data.get("datasets", []):
         time["time"] = str(datetime.now())
        
        # Guardar la información en un archivo
        with open(nombre_archivo, 'w') as file:
            json.dump(data, file, indent=2)

        print(f'Información exportada exitosamente en {nombre_archivo}')
    except requests.exceptions.RequestException as e:
        print(f'Error en la solicitud: {e}')


def convertir_json_a_csv(archivo_json, archivo_csv='datos_exportados.csv'):
    try:
        # Cargar datos desde el archivo JSON
        with open(archivo_json, 'r') as json_file:
            data = json.load(json_file)

        # Guardar la información en un archivo CSV
        with open(archivo_csv, 'w', newline='') as csvfile:
            # Crear un objeto escritor CSV
            csv_writer = csv.writer(csvfile)

            # Escribir el encabezado del CSV
            header = ["time", "phase", "current(A)", "voltage(V)", "power(W)", "cosphi", "frequency(Hz)", "energyconsumed(Wh)", "energyproduced(Wh)", "energybalanced(Wh)"]
            csv_writer.writerow(header)

            # Escribir datos de cada registro en el CSV
            for dataset in data.get("datasets", []):
                for phase_data in dataset.get("phases", []):
                    time = dataset.get("time", "")
                    phase_number = phase_data.get("phase", "")
                    phase_name = phase_data.get("name", "")
                    
                    # Crear una fila para cada fase
                    row = [time, f"{phase_name} "]

                    # Agregar los valores de cada fase a la fila
                    for values in phase_data.get("values", []):
                        value = values.get("data", "")
                        row.append(value)

                    # Escribir una fila en el CSV
                    csv_writer.writerow(row)

        print(f'Información exportada exitosamente en {archivo_csv}')
    except FileNotFoundError:
        print(f'Error: Archivo JSON "{archivo_json}" no encontrado.')
    except json.JSONDecodeError:
        print(f'Error: No se pudo decodificar el archivo JSON "{archivo_json}".')
    except Exception as e:
        print(f'Error desconocido: {e}')

#27 septiembre 2023 ultimos datos guardados

data_export_api_now()
convertir_json_a_csv('datos_exportados.json', 'datos_exportados.csv')

