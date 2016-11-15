import time
import sys

from piston.utils import sanitizePermlink
from transliterate import translit
from piston.steem import Steem

args = sys.argv

steem = Steem(wif=args[2])

title = args[3]
permlink = sanitizePermlink(translit(title, 'ru', reversed=True) + '-' + str(int(time.time())))

# TODO добавлять в пост url, дату публикации и тэги исходного поста в ЖЖ

steem.post(title=title, permlink=permlink, body=args[4], author=args[1], tags=["from-lj"])
