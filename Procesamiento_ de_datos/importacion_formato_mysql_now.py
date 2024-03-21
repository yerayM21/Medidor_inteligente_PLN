import json
import mysql.connector
from datetime import datetime

with open('datos_exportados.json','r') as f:
    data = json.load(f)

meter_data= []
tiempo=''
clave_data=['phases','Current_A','Voltage_V','Power_W','Cosphi','Frequency_Hz',"energyconsumed","energyproduced","energybalanced"]
for meter in data.get("datasets",[]):
        tiempo_str_without_ms = meter['time'][:19]
        tiempo = datetime.strptime(tiempo_str_without_ms, '%Y-%m-%d %H:%M:%S')
        tiempo_str = tiempo.strftime('%Y-%m-%d %H:%M:%S')
        for phase in meter.get('phases',[]):
         meter_data.append(phase['name'])
         for values in phase.get('values',[]):
             meter_data.append(values['data'])


mi_diccionario = []
for i in range(0,len(meter_data),len(clave_data)):
    sublista = meter_data[i:i + len(clave_data)]
    nuevo_elemento = dict(zip(['time'] + clave_data,[tiempo]+sublista))
    mi_diccionario.append(nuevo_elemento)

print(mi_diccionario[0])
#data ={'time:'time', phases:phase_1, current{unity}:data_current, voltaje{unity}:data_voltaje}


try:
    con = mysql.connector.connect(
        user = 'root',
        password = 'kenichixz12',
        host = 'localhost',
        port =3307,
        database ='data_meter'
    )
    if con.is_connected():
        print('connected!')
except Exception as e:
   print('cannot conncect!')

cur = con.cursor()

for item in mi_diccionario:
    if 'Voltage_V' in item:
        val = (item['time'], item['phases'], item['Current_A'], item['Voltage_V'], item['Power_W'], item['Cosphi'], item['Frequency_Hz'], item['energyconsumed'], item['energyproduced'], item['energybalanced'])
        sql = "INSERT INTO info(time,phases,Current_A,Voltage_V,Power_W,Cosphi,Frequency_Hz,energyconsumed,energyproduced,energybalanced) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        
        print("SQL:", sql)
        print("Values:", val)
        
        cur.execute(sql, val)
        con.commit()
        print(cur.rowcount, "rows got inserted")
    else:
        print("Skipping item without 'Voltage_V'")

cur.close()
con.close()
