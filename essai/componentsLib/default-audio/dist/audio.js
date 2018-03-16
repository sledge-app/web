/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	(function () {
	  class AudioComponent {

	    constructor (elem) {
	      this.elem = elem
	      this.foundationInit = false
	      elem.slaudio = this
	      this.playStatus = false
	      this.audio = elem.querySelector('audio')
	      this.playCtrl = elem.querySelector('.sl-audio-play')
	      if (this.playCtrl) {
	        this.playCtrlIcn = this.playCtrl.querySelector('i')
	        this.playCtrl.addEventListener('click', e => {
	          this.play()
	        })
	      }

	      this.audio.addEventListener('pause', e => {
	        this.playStatus = false
	      })

	      this.audio.addEventListener('play', e => {
	        this.playStatus = true
	      })

	      this.audio.addEventListener('timeupdate', e => {
	        let per = (this.audio.currentTime / this.audio.duration) * 100
	        if (this.meter) {
	          this.meter.style.width = per + '%'
	        }
	      })

	      if (elem.dataset.sounds) {
	        this.meter = elem.querySelector('.progress-meter')
	        this.sounds = JSON.parse(elem.dataset.sounds)
	        this.label = elem.querySelector('.sd_audio_title')
	        this.soundIndex = 0
	        this.img = elem.querySelector('.sl-aa-audio-img')
	        this.nextCtrl = elem.querySelector('.sl-audio-next')
	        this.prevCtrl = elem.querySelector('.sl-audio-prev')
	        if (this.nextCtrl && this.prevCtrl) {
	          if (this.sounds.length !== 0) {
	            this.setSound()
	          }
	          this.nextCtrl.addEventListener('click', e => {
	            this.next()
	          })
	          this.prevCtrl.addEventListener('click', e => {
	            this.prev()
	          })
	        } else {
	          if (!window.sledge) {
	            this.label.innerHTML = ''
	            if (this.meter) {
	              this.meter.style.width = '0%'
	            }
	          }
	        }
	        let list = elem.querySelector('.sl-aa-audio-list')
	        if (list) {
	          list.addEventListener('click', e => {
	            let idx = e.target.dataset.idx
	            if (idx) {
	              this.soundIndex = idx
	              if (e.target.parentNode.classList.contains('is-active')) {
	                this.play()
	              } else {
	                let current = this.elem.querySelector('.is-active')
	                if (current) {
	                  current.classList.remove('is-active')
	                }
	                e.target.parentNode.classList.add('is-active')
	                this.playStatus = true
	                this.setSound()
	              }
	            }
	          })
	        }
	      }
	    }

	    refresh () {
	      this.soundIndex = 0
	      this.sounds = JSON.parse(this.elem.dataset.sounds)
	      if (this.nextCtrl && this.prevCtrl) {
	        this.setSound()
	      }
	    }

	    next () {
	      this.soundIndex++
	      if (this.soundIndex + 1 > this.sounds.length) {
	        this.soundIndex = 0
	      }
	      this.setSound()
	    }

	    prev () {
	      this.soundIndex--
	      if (this.soundIndex < 0) {
	        this.soundIndex = this.sounds.length - 1
	      }
	      this.setSound()
	    }

	    setSound () {
	      console.info(this.sounds)
	      if (this.sounds.length === 0) {
	        return
	      }
	      this.audio.src = this.sounds[this.soundIndex].file
	      let obj = this.sounds[this.soundIndex]
	      this.img.style.backgroundImage = null
	      this.img.classList.remove('sd-visible')
	      if (obj.imagePath) {
	        this.img.classList.add('sd-visible')
	        this.img.style.backgroundImage = `url(${obj.imagePath})`
	      } else if (obj.interchange) {
	        const $elem = $(this.elem)
	        let audio = $elem.find('.sl-aa-audio-img')
	        let parent = audio.parent()
	        audio.remove()
	        parent.prepend('<div class="sl-aa-audio-img"></div>')
	        this.img = this.elem.querySelector('.sl-aa-audio-img')
	        this.img.classList.add('sd-visible')
	        this.img.style.backgroundImage = null
	        this.img.dataset.interchange = obj.interchange
	        this.foundationInit = false
	        window.requestAnimationFrame(() => {
	          if (!this.foundationInit) {
	            this.foundationInit = true
	            $(this.img).foundation()
	          } else {
	            window.Foundation.reInit('interchange')
	          }
	        })
	      }

	      console.info(this.label, this.sounds[this.soundIndex].name)

	      this.label.innerHTML = this.sounds[this.soundIndex].name
	      if (this.playStatus) {
	        this.audio.play()
	      }
	    }

	    play () {
	      if (this.playStatus) {
	        this.playStatus = false
	        this.audio.pause()
	        if (this.playCtrlIcn) {
	          this.playCtrlIcn.classList.remove('fi-pause')
	          this.playCtrlIcn.classList.add('fi-play')
	        }
	      } else {
	        this.playStatus = true
	        this.audio.play()
	        if (this.playCtrlIcn) {
	          this.playCtrlIcn.classList.remove('fi-play')
	          this.playCtrlIcn.classList.add('fi-pause')
	        }
	      }
	    }
	  }

	  function audioInit () {
	    let audios = document.querySelectorAll('.sl-audio')
	    ;[].forEach.call(audios, audio => {
	      if (!audio.slaudio) {
	        new window.$sledge.AudioComponent(audio)
	      }
	    })
	  }

	  if (!window.sledge) {
	    window.addEventListener('load', e => {
	      window.$sledge.AudioComponent = AudioComponent

	      if (!window.$sledge.refresh) {
	        window.$sledge.refresh = {}
	      }
	      window.$sledge.refresh['audioComponent'] = audioInit

	      window.$sledge.refresh['audioComponent']()
	    })
	  } else {
	    window.$sledge.AudioComponent = AudioComponent

	    if (!window.$sledge.refresh) {
	      window.$sledge.refresh = {}
	    }
	    window.$sledge.refresh['audioComponent'] = audioInit

	    window.addEventListener('load', e => {
	      window.$sledge.AudioComponent = AudioComponent
	    })
	  }
	})()


/***/ }
/******/ ]);