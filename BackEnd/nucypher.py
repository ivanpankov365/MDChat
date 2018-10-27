import uuid
import random

from typing import List
from umbral import pre, fragments


class MockNetwork(object):
    def __init__(self):
        self.db = {}

    def grant(self, kfrags: List[fragments.KFrag]) -> str:
        policy_id = str(uuid.uuid4())

        self.db[policy_id] = kfrags
        return policy_id

    def reencrypt(self, policy_id: str, capsule: pre.Capsule, M: int) -> List[fragments.CapsuleFrag]:
        try:
            kfrags = self.db[policy_id]
        except KeyError:
            raise ValueError("No Policy found for {}".format(policy_id))

        if M > len(kfrags):
            raise ValueError("Not enough KFrags to re-encrypt {} times!".format(M))

        cfrags = []
        m_kfrags = random.sample(kfrags, M)
        for kfrag in m_kfrags:
            cfrags.append(pre.reencrypt(kfrag, capsule))
        return cfrags

    def revoke(self, policy_id: str):
        del(self.db[policy_id])
