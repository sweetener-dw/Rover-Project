from connections import connect_mqtt, connect_internet
from time import sleep
from constants import ssid, mqtt_server, mqtt_user, mqtt_pass


# Function to handle an incoming message

def cb(topic, msg):
#     print(f"Topic: {topic}, Message: {msg}")
    if topic == b"temp":
        print("Message from temp.")
    

def main():
    try:
        connect_internet(ssid,password='legalmoment045')
        client = connect_mqtt(mqtt_server, mqtt_user, mqtt_pass)

        client.set_callback(cb)
        client.subscribe("temp")
        client.publish("temp", "message")
        while True:
            client.check_msg()
            sleep(1)

    except KeyboardInterrupt:
        print('keyboard interrupt')
        
        
if __name__ == "__main__":
    main()