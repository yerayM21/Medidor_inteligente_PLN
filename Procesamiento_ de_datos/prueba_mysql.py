import json
import mysql.connector
from datetime import datetime

with open('datos_exportados_tiempo.json', 'r') as f:
    data = json.load(f)

meter_data = []
tiempo = ''
clave_data = ["fecha", "hora", "parametro", "value"]
for parametros in data:
    parametro_key = parametros['key']
    values = parametros['values']
    for item in values:
        tiempo = item['time']
        fecha_hora = datetime.strptime(tiempo, "%Y-%m-%dT%H:%M:%S%z")
        fecha = fecha_hora.strftime("%Y-%m-%d")
        hora = fecha_hora.strftime("%H:%M:%S")
        valor = item['value']
        if valor != 0:
            meter_data.append({
                "fecha": fecha,
                "hora": hora,
                "parametro": parametro_key,
                "value": valor
            })

print(meter_data)

con = None  # Inicializar con como None antes del bloque try
try:
    con = mysql.connector.connect(
        user='root',
        password='kenichixz12',
        host='localhost',
        port=3307,
        database='data_meter'
    )
    if con.is_connected():
        print('connected!')
except Exception as e:
    print('cannot connect!')
    print(e)  # Imprimir el mensaje de error para obtener más información

if con:
    cur = con.cursor()

    for item in meter_data:
        val = (item['fecha'], item['hora'], item['parametro'], item['value'])
        sql = "INSERT INTO periodo_tiempo2(fecha,hora,parametro,value) VALUES (%s, %s, %s, %s)"

        print("SQL:", sql)
        print("Values:", val)

        try:
            cur.execute(sql, val)
            con.commit()
            print(cur.rowcount, "rows got inserted")
        except mysql.connector.Error as err:
            print("Error during insertion:", err)
            con.rollback()

    cur.close()
    con.close()