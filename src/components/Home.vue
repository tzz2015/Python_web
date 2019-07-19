<!--suppress ALL -->
<template>
  <div>
    <audio src="../../static/mp3/can_you.mp3" controls autoplay="autoplay" hidden="hidden"></audio>
    <div id="home">
      <div class="text-wrapper">
        <div class="text part1">
          <anim-word v-bind:text="word1" @poof="rem"></anim-word>
        </div>
        <div class="text part2">
          <anim-word v-bind:text="word2" @poof="rem"></anim-word>
        </div>
        <div class="how-to"><span v-if="clickTimes === 0">Just click a letter...</span><span
          v-else-if="clickTimes >= 5 && clickTimes < totalLetters">Hahahahaaaa! Click em all!!</span><span
          v-else-if="clickTimes >= totalLetters">Yay you did it! You did it!!</span><span
          v-else>Keep going... </span></div>
      </div>
      <div class="reset" @click="back">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2">
          <path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'

  Vue.component('anim-word', {
    props: ['text'],
    template: `<div><span class="letter" v-for="(letter, index) in text.letters"
      @click="$emit('poof', text.id, letter.char)"
      v-bind:class="{ poofed: !letter.alive }">
      <div class="character">{{ letter.char }}</div>
      <span></span>
    </span>
  </div>`
  })
  export default {
    name: 'Home',
    data () {
      return {
        clickTimes: 0,
        word1: {
          id: 1,
          letters: [
            {char: 'f', alive: true},
            {char: 's', alive: true},
            {char: 'h', alive: true},
            {char: 'o', alive: true},
            {char: 'w', alive: true},
            {char: 's', alive: true}
          ]
        },
        word2: {
          id: 2,
          letters: [
            {char: '特', alive: true},
            {char: '战', alive: true},
            {char: '小', alive: true},
            {char: '队', alive: true}
          ]
        },
        totalLetters: 0
      }
    },

    mounted () {
      this.totalLetters = this.word1.letters.length + this.word2.letters.length
    },
    created () {
    },
    methods: {
      rem (id, letter) {
        // update text
        if (!this.clicked) {
          this.clickTimes++
        }

        // word 1
        if (id === 1) {
          this.word1.letters = this.word1.letters.map(function (item) {
            if (item.char === letter) {
              item.alive = false
            }
            return item
          })
        } else if (id === 2) {
          // word 2
          this.word2.letters = this.word2.letters.map(function (item) {
            if (item.char === letter && item.alive !== false) {
              item.alive = false
              letter = null
            }
            return item
          })
        }
      },

      back () {
        // Reset text
        this.clickTimes = 0

        // Restore letter position
        this.word1.letters = this.word1.letters.map(function (item) {
          item.alive = true
          return item
        })
        this.word2.letters = this.word2.letters.map(function (item) {
          item.alive = true
          return item
        })
      }
    }

  }
</script>
<style>
  @import url("https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans:300");

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Fredoka One", cursive;
    font-size: 16px;
  }

  #home {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
  }

  .text-wrapper {
    padding: 0 1rem;
    max-width: 50rem;
    width: 100%;
    text-align: center;
  }

  .text {
    font-size: 8em;
    text-transform: uppercase;
    letter-spacing: -14px;
  }

  .text .letter {
    position: relative;
    display: inline-block;
    -webkit-transition: all .4s;
    transition: all .4s;
  }

  .text .letter .character {
    opacity: 0.65;
    -webkit-transition: color .4s;
    transition: color .4s;
    cursor: pointer;
  }

  .text .letter span {
    position: absolute;
    bottom: .8rem;
    left: .4rem;
    display: block;
    width: 100%;
    height: 15px;
  }

  .text .letter span::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
  }

  .text .letter:hover .character {
    color: #fff !important;
  }

  .text.part1 .letter:nth-child(1).poofed {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: poofing1 1.4s ease-in-out infinite alternate;
    animation: poofing1 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes poofing1 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes poofing1 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part1 .letter:nth-child(1) .character {
    color: #4e2a84;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 0.33333s;
    animation-delay: 0.33333s;
  }

  .text.part1 .letter:nth-child(1) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 0.33333s;
    animation-delay: 0.33333s;
  }

  .text.part1 .letter:nth-child(2).poofed {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: poofing2 1.4s ease-in-out infinite alternate;
    animation: poofing2 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes poofing2 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes poofing2 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part1 .letter:nth-child(2) .character {
    color: #ff5a5f;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 0.66667s;
    animation-delay: 0.66667s;
  }

  .text.part1 .letter:nth-child(2) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 0.66667s;
    animation-delay: 0.66667s;
  }

  .text.part1 .letter:nth-child(3).poofed {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: poofing3 1.4s ease-in-out infinite alternate;
    animation: poofing3 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes poofing3 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes poofing3 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part1 .letter:nth-child(3) .character {
    color: #f99b0c;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .text.part1 .letter:nth-child(3) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .text.part1 .letter:nth-child(4).poofed {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: poofing4 1.4s ease-in-out infinite alternate;
    animation: poofing4 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes poofing4 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes poofing4 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part1 .letter:nth-child(4) .character {
    color: #cee007;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 1.33333s;
    animation-delay: 1.33333s;
  }

  .text.part1 .letter:nth-child(4) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 1.33333s;
    animation-delay: 1.33333s;
  }

  .text.part1 .letter:nth-child(5).poofed {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: poofing5 1.4s ease-in-out infinite alternate;
    animation: poofing5 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes poofing5 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes poofing5 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part1 .letter:nth-child(5) .character {
    color: #00c6b2;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 1.66667s;
    animation-delay: 1.66667s;
  }

  .text.part1 .letter:nth-child(5) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 1.66667s;
    animation-delay: 1.66667s;
  }

  .text.part1 .letter:nth-child(6).poofed {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: poofing6 1.4s ease-in-out infinite alternate;
    animation: poofing6 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes poofing6 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes poofing6 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part1 .letter:nth-child(6) .character {
    color: #4e2a84;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
  }

  .text.part1 .letter:nth-child(6) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
  }

  .text.part2 span:nth-child(1).poofed {
    -webkit-animation: sec_poofing1 1.4s ease-in-out infinite alternate;
    animation: sec_poofing1 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing1 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing1 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(1) .character {
    color: #ff5a5f;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 2.33333s;
    animation-delay: 2.33333s;
  }

  .text.part2 span:nth-child(1) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 2.33333s;
    animation-delay: 2.33333s;
  }

  .text.part2 span:nth-child(2).poofed {
    -webkit-animation: sec_poofing2 1.4s ease-in-out infinite alternate;
    animation: sec_poofing2 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing2 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing2 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(2) .character {
    color: #f99b0c;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 2.66667s;
    animation-delay: 2.66667s;
  }

  .text.part2 span:nth-child(2) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 2.66667s;
    animation-delay: 2.66667s;
  }

  .text.part2 span:nth-child(3).poofed {
    -webkit-animation: sec_poofing3 1.4s ease-in-out infinite alternate;
    animation: sec_poofing3 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing3 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing3 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(3) .character {
    color: #cee007;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
  }

  .text.part2 span:nth-child(3) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
  }

  .text.part2 span:nth-child(4).poofed {
    -webkit-animation: sec_poofing4 1.4s ease-in-out infinite alternate;
    animation: sec_poofing4 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing4 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing4 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(4) .character {
    color: #00c6b2;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 3.33333s;
    animation-delay: 3.33333s;
  }

  .text.part2 span:nth-child(4) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 3.33333s;
    animation-delay: 3.33333s;
  }

  .text.part2 span:nth-child(5).poofed {
    -webkit-animation: sec_poofing5 1.4s ease-in-out infinite alternate;
    animation: sec_poofing5 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing5 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing5 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(5) .character {
    color: #4e2a84;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 3.66667s;
    animation-delay: 3.66667s;
  }

  .text.part2 span:nth-child(5) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 3.66667s;
    animation-delay: 3.66667s;
  }

  .text.part2 span:nth-child(6).poofed {
    -webkit-animation: sec_poofing6 1.4s ease-in-out infinite alternate;
    animation: sec_poofing6 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing6 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing6 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(6) .character {
    color: #ff5a5f;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }

  .text.part2 span:nth-child(6) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }

  .text.part2 span:nth-child(7).poofed {
    -webkit-animation: sec_poofing7 1.4s ease-in-out infinite alternate;
    animation: sec_poofing7 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing7 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing7 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(7) .character {
    color: #f99b0c;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 4.33333s;
    animation-delay: 4.33333s;
  }

  .text.part2 span:nth-child(7) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 4.33333s;
    animation-delay: 4.33333s;
  }

  .text.part2 span:nth-child(8).poofed {
    -webkit-animation: sec_poofing8 1.4s ease-in-out infinite alternate;
    animation: sec_poofing8 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing8 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing8 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(8) .character {
    color: #cee007;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 4.66667s;
    animation-delay: 4.66667s;
  }

  .text.part2 span:nth-child(8) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 4.66667s;
    animation-delay: 4.66667s;
  }

  .text.part2 span:nth-child(9).poofed {
    -webkit-animation: sec_poofing9 1.4s ease-in-out infinite alternate;
    animation: sec_poofing9 1.4s ease-in-out infinite alternate;
  }

  @-webkit-keyframes sec_poofing9 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  @keyframes sec_poofing9 {
    0% {
      -webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
    }
    50% {
      -webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
    }
    56% {
      -webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);
      transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);
    }
    100% {
      -webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);
      transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);
    }
  }

  .text.part2 span:nth-child(9) .character {
    color: #00c6b2;
    -webkit-animation: wave 1.2s linear infinite;
    animation: wave 1.2s linear infinite;
    -webkit-animation-delay: 5s;
    animation-delay: 5s;
  }

  .text.part2 span:nth-child(9) span::before {
    -webkit-animation: shadow 1.2s linear infinite;
    animation: shadow 1.2s linear infinite;
    -webkit-animation-delay: 5s;
    animation-delay: 5s;
  }

  @-webkit-keyframes wave {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @keyframes wave {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @-webkit-keyframes shadow {
    0% {
      width: 0;
      height: 0;
    }
    50% {
      width: 100%;
      height: 100%;
    }
    100% {
      width: 0;
      height: 0;
    }
  }

  @keyframes shadow {
    0% {
      width: 0;
      height: 0;
    }
    50% {
      width: 100%;
      height: 100%;
    }
    100% {
      width: 0;
      height: 0;
    }
  }

  .how-to {
    margin: 2rem 0 2rem 1rem;
    font-family: "Opens Sans", sans-serif;
    font-weight: 300;
    font-size: .85em;
    letter-spacing: 4px;
    color: rgba(255, 255, 255, 0.6);
  }

  .reset {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: .5rem;
    font-family: "Opens Sans", sans-serif;
    font-weight: 300;
    font-size: .85em;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-right: none;
    border-bottom: none;
    -webkit-transition: color .4s;
    transition: color .4s;
  }

  .reset svg {
    display: block;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }

  .reset:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .reset:hover svg {
    -webkit-animation: rotate 1s linear infinite;
    animation: rotate 1s linear infinite;
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotateZ(0) scale(0.7);
      transform: rotateZ(0) scale(0.7);
    }
    100% {
      -webkit-transform: rotateZ(360deg) scale(0.7);
      transform: rotateZ(360deg) scale(0.7);
    }
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotateZ(0) scale(0.7);
      transform: rotateZ(0) scale(0.7);
    }
    100% {
      -webkit-transform: rotateZ(360deg) scale(0.7);
      transform: rotateZ(360deg) scale(0.7);
    }
  }

  @media only screen and (max-width: 767px) {
    .text {
      font-size: 6em;
    }

    .text .letter span {
      bottom: .5rem;
    }
  }

  @media only screen and (max-width: 480px) {
    .text {
      font-size: 4em;
    }

    .text .letter span {
      bottom: 0;
    }
  }
</style>
