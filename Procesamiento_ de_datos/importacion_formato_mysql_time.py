import json
import mysql.connector
from datetime import datetime

with open('datos_exportados_tiempo.json','r') as f:
    data = json.load(f)

meter_data= []
tiempo=''
clave_data=["fecha", "hora", "parametro", "value"]
for parametros in data:
    parametro_key = parametros['key']
    values = parametros['values']
    for iteam in values:
        tiempo = iteam['time']
        fecha_hora = datetime.strptime(tiempo, "%Y-%m-%dT%H:%M:%S%z")
        fecha = fecha_hora.strftime("%Y-%m-%d")
        hora = fecha_hora.strftime("%H:%M:%S")
        valor = iteam['value']
        if valor !=0:
         meter_data.append({
            "fecha": fecha,
            "hora": hora,
            "parametro": parametro_key,
            "value": valor
         })

print(meter_data) 
#data ={'time:'time', phases:phase_1, current{unity}:data_current, voltaje{unity}:data_voltaje}


try:
    con = mysql.connector.connect(
        user = 'root',
        password = '*****',
        host = 'localhost',
        port =3307,
        database ='data_meter'
    )
    if con.is_connected():
        print('connected!')
except Exception as e:
   print('cannot conncect!')

cur = con.cursor()

for item in meter_data:
    val = (item['fecha'], item['hora'], item['parametro'], item['value'])
    sql = "INSERT INTO periodo_tiempo2(fecha,hora,parametro,value) VALUES (%s, %s, %s, %s)"
        
    print("SQL:", sql)
    print("Values:", val)
        
    cur.execute(sql, val)
    con.commit()
    print(cur.rowcount, "rows got inserted")
   
cur.close()
con.close()
