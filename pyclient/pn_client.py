import os,json
from time import sleep

import RPi.GPIO as gpio
from Pubnub import Pubnub

# setup
sub_key = "key"
sub_channel = "ducks"
led_pin = 16
gpio.setmode(gpio.BCM);
gpio.setup(led_pin,gpio.OUT)
gpio.output(led_pin,False)


def _callback(message,channel):
	print(message)
	gpio.output(led_pin,True)
	os.system('mplayer ~/quackquack/www/sounds/quack1.mp3 > /dev/null 2>&1 &')
	sleep(0.2)
	gpio.output(led_pin,False)

def _error(message):
	print(message)

if __name__ == "__main__":
	pubnub = Pubnub(publish_key="",subscribe_key=sub_key)
	pubnub.subscribe(sub_channel,callback=_callback,error=_error)
