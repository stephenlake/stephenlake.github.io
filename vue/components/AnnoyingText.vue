<template>
<pre><font color="#8AE234"><b>stephen@devbox</b></font><font color="#FFFFFF">:</font><font color="#729FCF"><b>~/develop</b></font><font color="#FFFFFF">$ {{ currentText }}</font>|</pre>
</template>
<script>
export default {
    mounted() {
        this.randomWordLoop()
    },
    data() {
        return {
            currentText: '',
            textLength: 0,
            alphabet: 'abcdefghijklmnopqrstuvwxyz#%&^+=-',
            speed: 70,
            steps: 4,
            texts: [
                'atom .',
                'composer create-project laravel/laravel next-amazing-idea',
                'php -S 0.0.0.0:80 -t public',
                'redis-cli KEYS \'cache_the_planet_*\'',
                'tail -F /var/log/syslog',
                'echo "FML" && rm -rf /',
                './vendor/bin/phpunit tests/',
                'git reset --hard',
                'echo "This project was a bad idea" && rm -rf ./the-next-best-thing/',
                'wget https://type.fit/api/quotes',
                'curl -H Authorization: Bearer abcdefghijklmnopqrstuvwxyz',
                'git commit -m "Fixed trailing whitespace :poop:"',
                'touch todays-blog-that-wont-be-published.md'
            ],
        }
    },
    methods: {
        getRandomWord() {
            return this.texts[Math.floor(Math.random() * this.texts.length)]
        },

        getRandomLetter() {
            return this.alphabet[Math.floor(Math.random() * this.alphabet.length)]
        },

        randomWordLoop() {
            var word = this.getRandomWord()
            this.textLength = word.length

            for (var i = 0; i < this.textLength; i++) {
                ((i, word) => {
                    this.letterAppear(i, word)
                })(i, word)
            }
        },

        letterAppear(i, word) {
            setTimeout(() => {
                this.randomLetters(i, word)
            }, this.speed * i)
        },

        randomLetters(i, word) {
            for (var j = 0; j <= this.steps; j++) {
                this.charsAnim(i, word, j)
            }
        },

        charsAnim(i, word, j) {
            setTimeout(() => {
                var count = j;
                if (j < this.steps) {
                    this.randomChar(i, word, count, j)
                } else {
                    this.goodChar(i, word, count, j)
                }
            }, ((this.speed / this.steps) * j) - (this.speed / this.steps))
        },

        randomChar(i, word, count, j) {
            var letter = this.getRandomLetter()

            if (j > 0) {
                var oldText = this.currentText.slice(0, -1);
            } else {
                var oldText = this.currentText;
            }

            this.currentText = oldText + letter
        },

        goodChar(i, word, count, j) {
            var oldText = this.currentText.slice(0, -1);
            this.currentText = oldText + word[i]

            if (i == this.textLength - 1) {
                this.removeWord()
            }
        },

        removeWord() {
            setTimeout(() => {
                for (var k = 0; k < this.textLength; k++) {
                    this.removeLetters(k)
                }
            }, this.speed * 30);
        },

        removeLetters(k) {
            setTimeout(() => {
                this.removeLetter(k)
            }, 75 * k)
        },

        removeLetter(k) {
            var actualText = this.currentText.slice(0, -1);
            this.currentText = actualText

            if (k == this.textLength - 1) {
                setTimeout(() => {
                    this.randomWordLoop()
                }, 500)
            }
        }
    }
}
</script>
