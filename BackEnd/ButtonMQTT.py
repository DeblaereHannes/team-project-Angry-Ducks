import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import paho.mqtt.client as mqtt
import time


def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")


client = mqtt.Client()
topic = "/angryducks/buttons"
client.on_connect = on_connect
client.connect("13.81.105.139", 1883, 60)
client.loop_forever()


def button1_callback(channel):
    print("Button1 was pushed!")
    # the four parameters are topic, sending content, QoS and whether retaining the message respectively
    client.publish(topic, payload="button1", qos=1, retain=False)


def button2_callback(channel):
    print("Button2 was pushed!")


GPIO.setwarnings(False)  # Ignore warning for now
GPIO.setmode(GPIO.BOARD)  # Use physical pin numbering

GPIO.setup(8, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # Set pin 8 to be an input pin and set initial value to be pulled low (off)
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # Set pin 10 to be an input pin and set initial value to be pulled low (off)

GPIO.add_event_detect(8, GPIO.RISING, callback=button1_callback)  # Setup event on pin 8 rising edge
GPIO.add_event_detect(10, GPIO.RISING, callback=button2_callback)  # Setup event on pin 10 rising edge

message = input("Press enter to quit\n\n")  # Run until someone presses enter
GPIO.cleanup()  # Clean up
