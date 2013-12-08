var classes = require('classes');

module.exports = Switch;

function Switch(el) {
    if (!(this instanceof Switch)) return new Switch(el);
    this.els = [];
    this.current = 0;
    
    if (el) this.extract(el);
    
    this.findDefault();
    this.show(this.default);
}

Switch.prototype.toggle = Switch.prototype.next = function () {
    this.show(this.current + 1 < this.els.length ? this.current + 1 : 0);
};

Switch.prototype.addEl = function (el) {
    
    this.els.push({
        el: el
      , classes: classes(el).add('hidden')
    });
    
    return this;
    
};

Switch.prototype.extract = function (el) {
    var children = el.childNodes
      , i = 0
      , l = children.length
    ;
    
    while (i < l) {
        if (children[i].nodeType === 1) this.addEl(children[i]);
        i += 1;
    }
    
    return this;
};

Switch.prototype.findDefault = function () {
    var els = this.els
      , i = 0
      , l = els.length
    ;
    
    while (i < l) {
        if (els[i].el.getAttribute('data-default-content')) {
            this.default = i;
            return this;
        }
        i += 1;
    }
    
    this.default = 0;
    
    return this;
};

Switch.prototype.show = function (i) {
    var el = this.els[i];
    
    if (el) {
        
        if (typeof this.current !== 'undefined') {
            this.els[this.current].classes.add('hidden');
        }
        
        el.classes.remove('hidden');
        this.current = i;
    }
};