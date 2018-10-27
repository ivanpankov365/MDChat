#!/usr/bin/env python3
import sys
import threading


def pipe(MD, Pacient):
    append_quote_sign = True
    if isinstance(MD, str):
        MD = open(MD, 'r')

    if isinstance(Pacient, str):
        Pacient = open(Pacient, 'w')
        append_quote_sign = False

    for line in MD:
        Pacient.write('> ' + line if append_quote_sign else line)
        Pacient.flush()


if __name__ == '__main__':
    assert len(sys.argv) == 3
    threading.Thread(target=pipe, args=(sys.argv[1], sys.stdout), daemon=False).start()
    pipe(sys.stdin, sys.argv[2])
