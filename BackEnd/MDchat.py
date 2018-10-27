
from nucypher import MockNetwork
from umbral import pre, keys, config


import argparse
import sys
import os


def main(m, n, fileNames):files = [open(fileName, 'w') for fileName in fileNames]
    config.set_default_curve()
    MDPrivateKey = keys.UmbralPrivateKey.gen_key()
    MDPublicKey = MDPrivateKey.get_pubkey()
    PacientPrivateKey = keys.UmbralPrivateKey.gen_key()
    PacientPublicKey = PacientPrivateKey.get_pubkey()

    mock_kms = MockNetwork()
    sys.stderr.write('Server is ready.\n' % os.getpid())

    for line in sys.stdin:
        cipText, capsule = pre.encrypt(MDPublicKey, line.rstrip('\n').encode('utf8'))
        MDkfrags = pre.split_rekey(MDPrivateKey, PacientPrivateKey, m, n)
        policy_id = mock_kms.grant(MDkfrags)
        pacientCfrags = mock_kms.reencrypt(policy_id, capsule, m)

        pacientCapsule = capsule
        for cfrag in pacientCfrags:
            pacientCapsule.attach_cfrag(cfrag)
            decrypted = pre.decrypt(cipText, pacientCapsule, PacientPublicKey, MDPublicKey)

        for file in files:
            file.write('%s\n' % decrypted.decode('utf8'))
            file.flush()

        mock_kms.revoke(policy_id)




if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-m', type=int, default=10)
    parser.add_argument('-n', type=int, default=20)
    parser.add_argument('fileNames', metavar='FILE', nargs='+')
    args = parser.parse_args()
    main(args.m, args.n, args.fileNames)
