from machine import Pin, PWM
from time import sleep

try:
    buzzer = PWM(Pin(15))
    button = Pin(14, Pin.IN, Pin.PULL_DOWN)

    buzzer.freq(2000)
    while True:
        if button.value():
            buzzer.duty_u16(32000)
        else:
            buzzer.duty_u16(0)

finally:
    buzzer.duty_u16(0)
    