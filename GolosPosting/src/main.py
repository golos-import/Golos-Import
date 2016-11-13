from piston.steem import Steem
import sys

args = sys.argv

steem = Steem(wif=args[2])

steem.post(args[3], args[4], args[1], category="from-lj")

"""data structure:
        args[0] - название скрипта,
        args[1] - ник в голосе,
        args[2] - приватный ключ,
        args[3] - заголовок поста,
        args[4] - тело поста. """