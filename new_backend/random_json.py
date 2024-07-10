import random
import time
import utils
from utils import *
# devices=['uav','ugv_1','ugv_2','ugv_3','ugv_4']
lat_longs=[[1.1,1.2],[1.12,1.23],[1.13,1.24],[1.14,1.25],[1.15,1.26],[1.16,1.27],[1.17,1.28],[1.18,1.29]]
posts=['critical','vitals','injury','frames']
funcs=['return_severe_ham','return_resp_distress','return_hr','return_rr','return_alertness_verbal','return_alertness_occular','return_alertness_motor','return_trauma']
def imitate_json(device):
    # device_id=random.randint(0,len(devices)-1)
    # device=devices[device_id]
    lat_long_id=random.randint(0,len(lat_longs)-1)
    lat_long=lat_longs[lat_long_id]
    func_id=random.randint(0,len(funcs)-1)
    func=funcs[func_id]
    fun=getattr(utils,func)
    data=fun()
    if func_id<2:
        post=posts[0]
    elif func_id<4:
        post=posts[1]
    elif func_id<8:
        post=posts[2]
    post_id=random.randint(0,3)
    post=posts[post_id]
    dict_json={'UXV_id':device,'lat_long':lat_long,'data':data,'post':post}
    print(dict_json)
    return dict_json