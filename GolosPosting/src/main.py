import time
import sys

from piston.steem import Steem
from piston.utils import sanitizePermlink
from transliterate import translit

args = sys.argv

steem = Steem(wif=args[2]) #постинг в ноду прописанную в библиотеке по умолчанию
# steem = Steem(node="wss://ws.golos.io", wif=args[2]) #можно в явном виде прописать ноду для постинга в Голос

title = args[3]
permlink = sanitizePermlink(translit(title, 'ru', reversed=True) + '-' + str(int(time.time())))

# TODO добавлять в пост url, дату публикации и тэги исходного поста в ЖЖ

steem.post(title=title, permlink=permlink, body=args[4], author=args[1], tags=["from-lj"])
