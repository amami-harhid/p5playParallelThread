p.PicoSprite = class extends p.Sprite {
    constructor(...args) {
      super(...args);
      this.build();
      this.timer = 0;
    }
    build() {
      const mReg = new p.MethodRegister();
      this.mReg = mReg;
      const C = new p.Control(mReg);
  
      // 入れ子にする場合には asyncを必ずつけること
      // 入れ子には await を必ずつけること
      let _xDirection = 1; // X方向の進行を逆転させるために使う。
      const _topMethod = 
      C.LoopForEver( async () => {
        await C.LoopRepeat(10, () => {
          this.y += 15;
          _hosei();
        })();
        await C.LoopWhile( _=> this.x > 0 && this.x < W, () => {
            this.x += 40 * _xDirection;
          }
        )();
        _hosei();
        this.x = 0;
        _xDirection = _xDirection*(-1);
        await C.LoopRepeat(10, async () => {
          this.rotation += 15;
          await C.LoopRepeat(10, () => {
            this.x += 10 * _xDirection;
            this.y -= 20;
            _hosei();
          })();
        })();
      });
      const _hosei = ()=>{
        if (this.x > W) this.x = 0;
        if (this.x < 0) this.x = W;
        if (this.y > H) this.y = 0;
        if (this.y < 0) this.y = H;
      };
      this.y = H/2;
      setTimeout(_topMethod, 1000);
    }
    draw() {
      super.draw();
      this.mReg.setWaitCancel();
    }
  };
  