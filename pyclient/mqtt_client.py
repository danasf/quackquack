import os,json
from time import sleep

import RPi.GPIO as gpio
import paho.mqtt.client as mqtt

# setup
host = "test.mosquitto.org"
sub_channel = "ducks/"
led_pin = 16
gpio.setup(led_pin,gpio.OUT)
gpio.output(led_pin,False)
 
def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))
	client.subscribe("ducks/")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
	print(msg.topic+" "+str(msg.payload))
	gpio.output(led_pin,True)
	os.system('mplayer ~/quackquack/www/sounds/quack1.mp3 > /dev/null 2>&1 &')
	sleep(0.2)
	gpio.output(led_pin,False)

if __name__ == "__main__":

	client = mqtt.Client()
	client.on_connect = on_connect
	client.on_message = on_message
	client.connect("test.mosquitto.org", 1883, 60)
	while True:
		client.loop()
