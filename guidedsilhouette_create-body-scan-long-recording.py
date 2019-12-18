https://github.com/jiaaro/pydub

from pydub import AudioSegment
from pydub.playback import play
sound = AudioSegment.from_file("chest-and-back.mp3",format="mp3")
two_sec_pause = AudioSegment.silent(duration=2000)


soundList = [AudioSegment.from_file("chest-and-back.mp3",format="mp3")
			,AudioSegment.from_file("head-and-face.mp3",format="mp3")
			,AudioSegment.from_file("left-arm.mp3",format="mp3")
			,AudioSegment.from_file("left-foot.mp3",format="mp3")
			,AudioSegment.from_file("left-hand.mp3",format="mp3")
			,AudioSegment.from_file("left-leg.mp3",format="mp3")
			,AudioSegment.from_file("neck-and-shoulders.mp3",format="mp3")
			,AudioSegment.from_file("pelvis-and-belly.mp3",format="mp3")
			,AudioSegment.from_file("right-arm.mp3",format="mp3")
			,AudioSegment.from_file("right-foot.mp3",format="mp3")
			,AudioSegment.from_file("right-hand.mp3",format="mp3")
			,AudioSegment.from_file("right-leg.mp3",format="mp3")]

longsound = sound+two_sec_pause*8
for k in range(180):
  print(k)
  longsound = longsound+sound+two_sec_pause*8
longsound.export("longsound_4.mp3",format="mp3")

from random import randint
guided = AudioSegment.silent(duration=2000)
for k in range(180):
  print(k)
  speech = soundList[randint(0,11)]
  pause = AudioSegment.silent(duration=1000*randint(5,30))
  guided = guided+speech+pause
guided.export("guided_hour_body_scan.mp3",format="mp3")

