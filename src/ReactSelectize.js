(function(){
  var ref$, each, filter, find, findIndex, id, initial, last, map, objToPairs, partition, reject, reverse, sortBy, sum, values, clamp, isEqualToObject, React, div, input, span, createClass, createFactory, findDOMNode, ReactCSSTransitionGroup, cancelEvent, OptionWrapper, ValueWrapper;
  ref$ = require('prelude-ls'), each = ref$.each, filter = ref$.filter, find = ref$.find, findIndex = ref$.findIndex, id = ref$.id, initial = ref$.initial, last = ref$.last, map = ref$.map, objToPairs = ref$.objToPairs, partition = ref$.partition, reject = ref$.reject, reverse = ref$.reverse, sortBy = ref$.sortBy, sum = ref$.sum, values = ref$.values;
  ref$ = require('prelude-extension'), clamp = ref$.clamp, isEqualToObject = ref$.isEqualToObject;
  React = require('react'), ref$ = React.DOM, div = ref$.div, input = ref$.input, span = ref$.span, createClass = React.createClass, createFactory = React.createFactory;
  findDOMNode = require('react-dom').findDOMNode;
  ReactCSSTransitionGroup = createFactory(require('react-addons-css-transition-group'));
  cancelEvent = function(e){
    e.preventDefault();
    e.stopPropagation();
  };
  OptionWrapper = createFactory(createClass({
    render: function(){
      return div({
        className: "option-wrapper " + (!!this.props.highlight ? 'highlight' : ''),
        onClick: this.props.onClick,
        onMouseMove: this.props.onMouseMove,
        onMouseOut: this.props.onMouseOut,
        onMouseOver: this.props.onMouseOver
      }, this.props.renderItem(this.props.item));
    },
    shouldComponentUpdate: function(nextProps){
      var ref$, ref1$, ref2$;
      return !isEqualToObject(nextProps != null ? nextProps.uid : void 8, (ref$ = this.props) != null ? ref$.uid : void 8) || (nextProps != null ? nextProps.highlight : void 8) !== ((ref1$ = this.props) != null ? ref1$.highlight : void 8) || (nextProps != null ? nextProps.selectable : void 8) !== ((ref2$ = this.props) != null ? ref2$.selectable : void 8);
    }
  }));
  ValueWrapper = createFactory(createClass({
    render: function(){
      return div({
        className: 'value-wrapper'
      }, this.props.renderItem(this.props.item));
    },
    shouldComponentUpdate: function(nextProps){
      var ref$;
      return !isEqualToObject(nextProps != null ? nextProps.uid : void 8, (ref$ = this.props) != null ? ref$.uid : void 8);
    }
  }));
  module.exports = createClass({
    displayName: 'ReactSelectize',
    focusLock: false,
    scrollLock: false,
    getDefaultProps: function(){
      return {
        anchor: null,
        autosize: function($search){
          var x$, $input, ref$;
          if ($search.value.length === 0) {
            $search.style.width = !!($search != null && $search.currentStyle) ? '4px' : '2px';
          } else {
            if ($search.scrollWidth > 0) {
              $search.style.width = (2 + $search.scrollWidth) + "px";
            } else {
              x$ = $input = document.createElement('div');
              x$.innerHTML = $search.value;
              (function(){
                return $input.style.width = "";
              })(
              each(function(arg$){
                var key, value;
                key = arg$[0], value = arg$[1];
                return $input.style[key] = value;
              })(
              objToPairs(
              !!$search.currentStyle
                ? $search.currentStyle
                : (ref$ = document.defaultView) != null
                  ? ref$
                  : window.getComputedStyle($search))));
              document.body.appendChild($input);
              $search.style.width = (4 + $input.clientWidth) + "px";
              document.body.removeChild($input);
            }
          }
        },
        disabled: false,
        dropdownDirection: 1,
        firstOptionIndexToHighlight: function(options){
          return 0;
        },
        groupId: function(it){
          return it.groupId;
        },
        groupsAsColumns: false,
        highlightedUid: undefined,
        onAnchorChange: function(anchor){},
        onBlur: function(values, reason){},
        onFocus: function(values, reason){},
        onHighlightedUidChange: function(uid, callback){},
        onOpenChange: function(open, callback){},
        onSearchChange: function(search, callback){},
        onValuesChange: function(values, callback){},
        open: false,
        options: [],
        renderNoResultsFound: function(){
          return div({
            className: 'no-results-found'
          }, "No results found");
        },
        renderGroupTitle: function(index, arg$){
          var groupId, title;
          if (arg$ != null) {
            groupId = arg$.groupId, title = arg$.title;
          }
          return div({
            className: 'simple-group-title',
            key: groupId
          }, title);
        },
        renderOption: function(arg$){
          var label, newOption, selectable, isSelectable;
          if (arg$ != null) {
            label = arg$.label, newOption = arg$.newOption, selectable = arg$.selectable;
          }
          isSelectable = typeof selectable === 'undefined' || selectable;
          return div({
            className: "simple-option " + (isSelectable ? '' : 'not-selectable')
          }, span(null, !!newOption ? "Add " + label + " ..." : label));
        },
        renderValue: function(arg$){
          var label;
          label = arg$.label;
          return div({
            className: 'simple-value'
          }, span(null, label));
        },
        search: "",
        style: {},
        transitionEnter: false,
        transitionLeave: false,
        transitionEnterTimeout: 200,
        transitionLeaveTimeout: 200,
        uid: id,
        values: []
      };
    },
    render: function(){
      var anchorIndex, renderSelectedValues, renderOptions, ref$, ref1$, groups, this$ = this;
      anchorIndex = (function(){
        var ref$;
        switch (false) {
        case !(typeof this.props.anchor === 'undefined' || this.props.anchor === null):
          return -1;
        default:
          return (ref$ = findIndex(function(it){
            return this$.isEqualToObject(it, this$.props.anchor);
          }, this.props.values)) != null
            ? ref$
            : this.props.values.length - 1;
        }
      }.call(this));
      renderSelectedValues = function(it){
        return map(function(index){
          var item, uid;
          item = this$.props.values[index];
          uid = this$.props.uid(item);
          return ValueWrapper({
            uid: uid,
            key: this$.uidToString(uid),
            item: item,
            renderItem: this$.props.renderValue
          });
        })(
        it);
      };
      return div({
        className: "react-selectize" + (!!this.props.className ? " " + this.props.className : "") + ((this.props.disabled ? ' disabled' : '') + "" + (this.props.open ? ' open' : '') + (this.props.dropdownDirection === -1 ? ' flipped' : '')),
        style: this.props.style
      }, div({
        className: 'control',
        ref: 'control',
        onClick: function(){
          return this$.props.onAnchorChange(last(this$.props.values), function(){
            return this$.props.onOpenChange(true, function(){
              return this$.focus();
            });
          });
        }
      }, this.props.search.length === 0 && this.props.values.length === 0 ? div({
        className: 'placeholder'
      }, this.props.placeholder) : void 8, renderSelectedValues((function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = anchorIndex; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }())), input({
        disabled: this.props.disabled,
        ref: 'search',
        type: 'text',
        value: this.props.search,
        onChange: function(arg$){
          var value;
          value = arg$.currentTarget.value;
          return this$.props.onSearchChange(value, function(){
            return this$.highlightAndScrollToSelectableOption(this$.props.firstOptionIndexToHighlight(this$.props.options), 1);
          });
        },
        onFocus: function(){
          (function(){
            return function(callback){
              if (!!this$.focusLock) {
                return callback(this$.focusLock = false);
              } else {
                return this$.props.onOpenChange(true, function(){
                  return callback(true);
                });
              }
            };
          })()(function(result){
            return this$.props.onFocus(this$.props.values, !!result ? 'event' : 'focus');
          });
        },
        onKeyDown: function(e){
          var index;
          switch (e.which) {
          case 9:
            this$.props.onOpenChange(false, function(){
              return this$.props.onAnchorChange(last(this$.props.values), function(){
                return this$.props.onBlur(this$.props.values, 'tab');
              });
            });
            break;
          case 8:
            if (this$.props.search.length > 0 || anchorIndex === -1) {
              return;
            }
            (function(){
              var anchorIndexOnRemove, nextAnchor, valueToRemove, ref$;
              anchorIndexOnRemove = anchorIndex;
              nextAnchor = anchorIndex - 1 < 0
                ? undefined
                : this$.props.values[anchorIndex - 1];
              valueToRemove = this$.props.values[anchorIndex];
              return this$.props.onValuesChange((ref$ = reject(function(it){
                return this$.isEqualToObject(it, valueToRemove);
              }, this$.props.values)) != null
                ? ref$
                : [], function(){
                return function(){
                  return function(callback){
                    if (typeof find(function(it){
                      return this$.isEqualToObject(it, valueToRemove);
                    }, this$.props.values) === 'undefined') {
                      if (!!this$.props.restoreOnBackspace) {
                        return this$.props.onSearchChange(this$.props.restoreOnBackspace(valueToRemove), function(){
                          return callback(true);
                        });
                      } else {
                        return callback(true);
                      }
                    } else {
                      return callback(false);
                    }
                  };
                }()(function(result){
                  if (!!result) {
                    this$.highlightAndScrollToSelectableOption(this$.props.firstOptionIndexToHighlight(this$.props.options), 1);
                  }
                  if (!!result && anchorIndex === anchorIndexOnRemove && (typeof nextAnchor === 'undefined' || !!find(function(it){
                    return this$.isEqualToObject(it, nextAnchor);
                  }, this$.props.values))) {
                    return this$.props.onAnchorChange(nextAnchor, function(){});
                  }
                });
              });
            })();
            cancelEvent(e);
            break;
          case 27:
            (function(){
              if (this$.props.open) {
                return function(it){
                  return this$.props.onOpenChange(false, it);
                };
              } else {
                return function(it){
                  return this$.props.onValuesChange([], it);
                };
              }
            })()(function(){
              return this$.props.onSearchChange("", function(){
                return this$.focus();
              });
            });
          }
          if (this$.props.search.length === 0) {
            switch (e.which) {
            case 37:
              this$.props.onAnchorChange(anchorIndex - 1 < 0 || e.metaKey
                ? undefined
                : this$.props.values[clamp(anchorIndex - 1, 0, this$.props.values.length - 1)], function(){});
              break;
            case 39:
              this$.props.onAnchorChange(e.metaKey
                ? last(this$.props.values)
                : this$.props.values[clamp(anchorIndex + 1, 0, this$.props.values.length - 1)], function(){});
            }
          }
          if (this$.props.options.length === 0) {
            return;
          }
          if (e.which === 13 && this$.props.open) {
            this$.selectHighlightedUid(anchorIndex);
          } else {
            switch (e.which) {
            case 38:
              this$.scrollLock = true;
              index = -1 + this$.optionIndexFromUid(this$.props.highlightedUid);
              this$.highlightAndScrollToSelectableOption(index, -1, function(result){
                if (!result) {
                  return this$.highlightAndScrollToSelectableOption(this$.props.options.length - 1, -1);
                }
              });
              break;
            case 40:
              this$.scrollLock = true;
              index = 1 + this$.optionIndexFromUid(this$.props.highlightedUid);
              this$.highlightAndScrollToSelectableOption(index, 1, function(result){
                if (!result) {
                  return this$.highlightAndScrollToSelectableOption(0, 1);
                }
              });
              break;
            default:
              return;
            }
          }
          return cancelEvent(e);
        }
      }), renderSelectedValues((function(){
        var i$, to$, results$ = [];
        for (i$ = anchorIndex + 1, to$ = this.props.values.length; i$ < to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }.call(this))), div({
        className: 'reset',
        onClick: function(e){
          (function(){
            return this$.props.onValuesChange([], function(){
              return this$.props.onSearchChange("", function(){
                return this$.focus();
              });
            });
          })();
          return cancelEvent(e);
        }
      }, '×'), div({
        className: 'arrow',
        onClick: function(e){
          if (this$.props.open) {
            this$.props.onOpenChange(false);
            this$.props.onBlur(this$.props.values, 'arrow-click');
          } else {
            this$.props.onAnchorChange(last(this$.props.values), function(){
              return this$.props.onOpenChange(true, function(){
                return this$.focus();
              });
            });
          }
          return cancelEvent(e);
        }
      })), ReactCSSTransitionGroup({
        component: 'div',
        transitionName: 'slide',
        transitionEnter: this.props.transitionEnter,
        transitionLeave: this.props.transitionLeave,
        transitionEnterTimeout: this.props.transitionEnterTimeout,
        transitionLeaveTimeout: this.props.transitionLeaveTimeout,
        className: 'dropdown-transition',
        ref: 'dropdown-transition'
      }, this.props.open ? (renderOptions = function(options, indexOffset){
        return map(function(index){
          var option, uid;
          option = options[index];
          uid = this$.props.uid(option);
          return OptionWrapper(import$({
            uid: uid,
            ref: "option-" + this$.uidToString(uid),
            key: this$.uidToString(uid),
            item: option,
            highlight: isEqualToObject(this$.props.highlightedUid, uid),
            onMouseMove: function(arg$){
              var currentTarget;
              currentTarget = arg$.currentTarget;
              if (this$.scrollLock) {
                this$.scrollLock = false;
              }
            },
            onMouseOut: function(){
              if (!this$.scrollLock) {
                this$.props.onHighlightedUidChange(undefined);
              }
            },
            renderItem: this$.props.renderOption
          }, (function(){
            switch (false) {
            case !(typeof (option != null ? option.selectable : void 8) === 'boolean' && !option.selectable):
              return {
                onClick: cancelEvent
              };
            default:
              return {
                onClick: function(e){
                  this$.selectHighlightedUid(anchorIndex);
                },
                onMouseOver: function(arg$){
                  var currentTarget;
                  currentTarget = arg$.currentTarget;
                  if (!this$.scrollLock) {
                    this$.props.onHighlightedUidChange(uid);
                  }
                }
              };
            }
          }())));
        })(
        (function(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = options.length; i$ < to$; ++i$) {
            results$.push(i$);
          }
          return results$;
        }()));
      }, div({
        className: 'dropdown',
        key: 'dropdown',
        ref: 'dropdown'
      }, this.props.options.length === 0
        ? this.props.renderNoResultsFound()
        : ((ref$ = this.props) != null ? (ref1$ = ref$.groups) != null ? ref1$.length : void 8 : void 8) > 0
          ? (groups = map(function(index){
            var group, groupId, options;
            group = this$.props.groups[index], groupId = group.groupId;
            options = filter(function(it){
              return this$.props.groupId(it) === groupId;
            })(
            this$.props.options);
            return {
              index: index,
              group: group,
              options: options
            };
          })(
          (function(){
            var i$, to$, results$ = [];
            for (i$ = 0, to$ = this.props.groups.length; i$ < to$; ++i$) {
              results$.push(i$);
            }
            return results$;
          }.call(this))), div({
            className: "groups " + (!!this.props.groupsAsColumns ? 'as-columns' : '')
          }, map(function(arg$){
            var index, group, groupId, options, offset;
            index = arg$.index, group = arg$.group, groupId = group.groupId, options = arg$.options;
            offset = sum(
            map(function(it){
              return groups[it].options.length;
            })(
            (function(){
              var i$, to$, results$ = [];
              for (i$ = 0, to$ = index; i$ < to$; ++i$) {
                results$.push(i$);
              }
              return results$;
            }())));
            return div({
              key: groupId
            }, this$.props.renderGroupTitle(index, group, options), div({
              className: 'options'
            }, renderOptions(options, offset)));
          })(
          filter(function(it){
            return it.options.length > 0;
          })(
          groups))))
          : renderOptions(this.props.options, 0))) : void 8));
    },
    componentDidMount: function(){
      var rootNode, this$ = this;
      rootNode = findDOMNode(this);
      this.externalClickListener = function(arg$){
        var target, domNodeContains;
        target = arg$.target;
        domNodeContains = function(element){
          if (typeof element === 'undefined' || element === null) {
            return false;
          }
          if (element === rootNode) {
            return true;
          }
          return domNodeContains(element.parentElement);
        };
        if (!domNodeContains(target)) {
          this$.props.onOpenChange(false);
          return this$.props.onBlur(this$.props.values, 'click');
        }
      };
      document.addEventListener('click', this.externalClickListener, true);
    },
    componentWillUnmount: function(){
      document.removeEventListener('click', this.externalClickListener, true);
    },
    componentDidUpdate: function(prevProps, prevState){
      var x$, $search, $dropdownTransition, ref$;
      if (this.props.open && !prevProps.open && this.props.highlightedUid === undefined) {
        this.highlightAndScrollToSelectableOption(this.props.firstOptionIndexToHighlight(this.props.options), 1);
        this.focus();
      }
      if (!this.props.open && prevProps.open) {
        this.props.onHighlightedUidChange(undefined);
      }
      x$ = $search = findDOMNode(this.refs.search);
      x$.style.width = "0px";
      x$.style.width = this.props.autosize($search) + "px";
      $dropdownTransition = findDOMNode(this.refs['dropdown-transition']);
      if (!!this.refs.dropdown) {
        ref$ = $dropdownTransition.style;
        ref$.bottom = this.props.dropdownDirection === -1 ? findDOMNode(this.refs.control).offsetHeight : "";
        ref$.height = this.refs.dropdown.offsetHeight + "px";
      } else {
        $dropdownTransition.style.height = '0px';
      }
    },
    componentWillReceiveProps: function(props){
      if ((typeof this.props.disabled === 'undefined' || this.props.disabled === false) && (typeof props.disabled !== 'undefined' && props.disabled === true)) {
        this.props.onOpenChange(false);
      }
    },
    optionIndexFromUid: function(uid){
      var this$ = this;
      return findIndex(function(it){
        return isEqualToObject(uid, this$.props.uid(it));
      })(
      this.props.options);
    },
    blur: function(){
      findDOMNode(this.refs.search).blur();
      this.props.onBlur(this.props.values, 'blur');
    },
    focus: function(){
      if (findDOMNode(this.refs.search) !== document.activeElement) {
        this.focusLock = true;
        findDOMNode(this.refs.search).focus();
      }
    },
    highlightAndScrollToOption: function(index, callback){
      var uid, this$ = this;
      callback == null && (callback = function(){});
      if (!index) {
        index = 0;
      }
      uid = this.props.uid(this.props.options[index]);
      this.props.onHighlightedUidChange(uid, function(){
        var ref$, ref1$, optionElement, parentElement, optionHeight;
        if ((ref$ = findDOMNode((ref1$ = this$.refs) != null ? ref1$["option-" + this$.uidToString(uid)] : void 8)) != null) {
          optionElement = ref$;
        }
        parentElement = findDOMNode(this$.refs.dropdown);
        if (!!optionElement) {
          optionHeight = optionElement.offsetHeight - 1;
          if (optionElement.offsetTop - parentElement.scrollTop >= parentElement.offsetHeight) {
            parentElement.scrollTop = optionElement.offsetTop - parentElement.offsetHeight + optionHeight;
          } else if (optionElement.offsetTop - parentElement.scrollTop + optionHeight <= 0) {
            parentElement.scrollTop = optionElement.offsetTop;
          }
        }
        return callback();
      });
    },
    highlightAndScrollToSelectableOption: function(index, direction, callback){
      var this$ = this;
      callback == null && (callback = function(){});
      (function(){
        if (!this$.props.open) {
          return function(it){
            return this$.props.onOpenChange(true, it);
          };
        } else {
          return function(it){
            return it();
          };
        }
      })()(function(){
        var option, ref$, ref1$;
        if (index < 0 || index >= this$.props.options.length) {
          return this$.props.onHighlightedUidChange(undefined, function(){
            return callback(false);
          });
        } else {
          option = (ref$ = this$.props) != null ? (ref1$ = ref$.options) != null ? ref1$[index] : void 8 : void 8;
          if (typeof (option != null ? option.selectable : void 8) === 'boolean' && !option.selectable) {
            return this$.highlightAndScrollToSelectableOption(index + direction, direction, callback);
          } else {
            return this$.highlightAndScrollToOption(index, function(){
              return callback(true);
            });
          }
        }
      });
    },
    isEqualToObject: function(){
      return isEqualToObject(this.props.uid(arguments[0]), this.props.uid(arguments[1]));
    },
    selectHighlightedUid: function(anchorIndex){
      var index, option, this$ = this;
      if (this.props.highlightedUid === undefined) {
        return;
      }
      index = this.optionIndexFromUid(this.props.highlightedUid);
      if (typeof index !== 'number') {
        return;
      }
      option = this.props.options[index];
      this.props.onValuesChange(map(function(it){
        return this$.props.values[it];
      }, (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = anchorIndex; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }())).concat([option], map(function(it){
        return this$.props.values[it];
      }, (function(){
        var i$, to$, results$ = [];
        for (i$ = anchorIndex + 1, to$ = this.props.values.length; i$ < to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }.call(this)))), function(){
        var value;
        value = find(function(it){
          return this$.isEqualToObject(it, option);
        }, this$.props.values);
        if (!value) {
          return;
        }
        return this$.props.onSearchChange("", function(){
          return this$.props.onAnchorChange(value, function(){
            if (!this$.props.open) {
              return;
            }
            return this$.highlightAndScrollToSelectableOption(index, 1, function(result){
              if (!!result) {
                return;
              }
              return this$.highlightAndScrollToSelectableOption(this$.props.firstOptionIndexToHighlight(this$.props.options), 1, function(result){
                if (!result) {
                  return this$.props.onOpenChange(false, function(){});
                }
              });
            });
          });
        });
      });
    },
    uidToString: function(uid){
      return (typeof uid === 'object' ? JSON.stringify : id)(uid);
    }
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
