import requests
import json
import csv
from datetime import datetime

fecha1 = '2023/09/27'
fecha2 = '2023/10/20'

fecha_1 = datetime.strptime(fecha1,"%Y/%m/%d")
fecha_2 = datetime.strptime(fecha2,"%Y/%m/%d")

hora1 = "12:00 AM"
hora2 = "1:00 AM"

hora_1 = datetime.strptime(hora1, "%I:%M %p").strftime("%H:%M:%S")
hora_2 = datetime.strptime(hora2, "%I:%M %p").strftime("%H:%M:%S")

allow_parameters=['current','voltage','power','cosphi','energy_pos','energy_neg']

num_phase ='123'


def data_export_api_time(nombre_archivo='datos_exportados_tiempo.json'):
    api ='http://192.168.0.200/api/chart/123/power/from/2023-10-29T00:00:00.000Z/to/2023-11-23T14:00:00.000Z'
    try:
        # Realizar la solicitud GET
        response = requests.get(api)

        # Verificar si la solicitud fue exitosa (código de estado 200)
        response.raise_for_status()

        # Convertir la respuesta a formato JSON si la API devuelve JSON
        data = response.json()

        # limpiar datos para obtener un linea tiempo de 1hr
        list_conservar = []
        for parameter in data: 
         values = parameter['values'] 
         for i in range(0,len(values),60):
             list_conservar.append(values[i])
        
        for new_values in data:
             new_values['values'] = list_conservar
        
        # Guardar la información en un archivo
        with open(nombre_archivo, 'w') as file:
            json.dump(data, file, indent=2)

        print(f'Información exportada exitosamente en {nombre_archivo}')
    except requests.exceptions.RequestException as e:
        print(f'Error en la solicitud: {e}')



def convertir_json_a_csv(archivo_json, archivo_csv='datos_exportados_tiempo.csv'):
    try:
        # Cargar datos desde el archivo JSON
        with open(archivo_json, 'r') as json_file:
            data = json.load(json_file)

        # Guardar la información en un archivo CSV
        with open(archivo_csv, 'w', newline='') as csvfile:
            # Crear un objeto escritor CSV
            csv_writer = csv.writer(csvfile)

            # Escribir el encabezado del CSV
            header = ["fecha", "hora", "parametro", "value"]
            csv_writer.writerow(header)

            # Escribir datos de cada registro en el CSV
            for parameter in data: 
                parametro = parameter['key']
                for values in parameter['values']:
                    timestamp = values['time']
                    fecha_hora = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S%z")
                    fecha = fecha_hora.strftime("%Y-%m-%d")
                    hora = fecha_hora.strftime("%H:%M")
                    value = values['value']

                    # Filtrar los valores diferentes de cero
                    if value != 0:
                        # Crear una fila para cada fase
                        row = [fecha, hora, parametro, value]

                        # Escribir una fila en el CSV
                        csv_writer.writerow(row)

        print(f'Información exportada exitosamente en {archivo_csv}')
    except FileNotFoundError:
        print(f'Error: Archivo JSON "{archivo_json}" no encontrado.')
    except json.JSONDecodeError:
        print(f'Error: No se pudo decodificar el archivo JSON "{archivo_json}".')
    except Exception as e:
        print(f'Error desconocido: {e}')

# Ejemplo de uso
data_export_api_time()
convertir_json_a_csv('datos_exportados_tiempo.json')
