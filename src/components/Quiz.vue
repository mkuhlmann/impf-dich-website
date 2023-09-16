<template>
	<div>
		<div v-if="curIndex >= 0" class="quiz">
			<div class="quiz__navigation">
				<a v-show="curIndex > 0" v-on:click="prevQuestion()">Vorherige Frage</a>
				<a v-show="curQuestion.isAnswered" v-on:click="nextQuestion()">{{ curIndex == questions.length - 1 ? 'Auswertung' : 'Nächste Frage' }}</a>
			</div>

			<div class="quiz__question">
				<div class="quiz__question__subheader">Frage {{ curIndex + 1 }} von {{ questions.length }}</div>
				{{ curQuestion.text }}
			</div>

			<div class="quiz__answers">
				<div
					class="quiz__answer"
					v-bind:class="{ 'quiz__answer--right': curQuestion.isAnswered && a.isRight, 'quiz__answer--wrong': curQuestion.isAnswered && !a.isRight }"
					v-for="(a, index) in curQuestion.answers"
				>
					<div v-on:click="answerQuestion(index)" class="quiz__answer__header">
						<div class="quiz__answer__abc">{{ curQuestion.answerIdx == index ? (a.isRight ? '✔' : '✘') : ['A', 'B', 'C', 'D', 'E', 'F'][index] }}</div>
						<div class="quiz__answer__text">{{ a.text }}</div>
					</div>

					<div v-show="curQuestion.isAnswered" class="quiz__answer__explanation">
						<strong v-if="curQuestion.answerIdx == index && a.isRight">Richtig!</strong><strong v-if="curQuestion.answerIdx == index && !a.isRight">Leider falsch.</strong> {{ a.explanation }}
					</div>
				</div>
			</div>

			<div class="quiz__navigation">
				<a v-show="curIndex > 0" v-on:click="prevQuestion()">Vorherige Frage</a>
				<a v-show="curQuestion.isAnswered" v-on:click="nextQuestion()">{{ curIndex == questions.length - 1 ? 'Auswertung' : 'Nächste Frage' }}</a>
			</div>
		</div>

		<div v-if="curIndex == -1" style="text-align: center">
			<div class="quiz__boxwrap">
				<h2 class="font-heading text-4xl mb-5">Mach das Impf-Quiz!</h2>
				<p>
					Wie gut kennst du dich mit dem Thema Impfen aus?<br />
					Schaffst du es unsere Fragen zu meistern?
				</p>
				<br />
				<p>Aber auch wenn du noch nicht so viel weißt, keine Scheu, zu jeder Frage ist eine ausführliche Erklärung gegeben, sodass du in jedem Fall etwas neues lernst.</p>
				<button class="mt-5 rounded bg-green-500 hover:bg-green-600 text-white text-xl py-3 px-5 cursor-pointer" v-on:click="startQuiz()">Start</button>
			</div>
		</div>

		<div v-if="curIndex == -2" class="quiz__score">
			<div class="quiz__boxwrap">
				<h1 v-if="percentageRight > 70" class="title is-2">Wow!</h1>
				<h1 v-if="percentageRight >= 40 && percentageRight < 70" class="title is-2">Nicht schlecht!</h1>
				<h1 v-if="percentageRight >= 0 && percentageRight < 40" class="title is-2">Gar nicht einfach.</h1>

				<svg width="120" height="120" viewBox="0 0 120 120">
					<circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12"></circle>
					<circle cx="60" cy="60" r="54" fill="none" stroke="#5b9cd4" stroke-width="12" stroke-dasharray="339.292" v-bind:stroke-dashoffset="dashOffset"></circle>
				</svg>

				<div class="has-margin-bottom-md">{{ totalRight }} von {{ totalQuestions }} richtig beantwortet.</div>

				<p v-if="percentageRight > 60">
					Auch wenn du schon ein echter Impfexperte zu sein scheinst, würden wir uns freuen wenn du dir auch noch unsere zahlreichen vertiefenden Informationsseiten anguckst
				</p>
				<p v-if="percentageRight >= 0 && percentageRight < 60">
					Wir hoffen du hast neues gelernt und würden uns freuen wenn du dir auch noch unsere zahlreichen vertiefenden Informationsseiten anguckst
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			questions: null,
			curQuestion: null,
			curIndex: -1,
			totalRight: 0,
			percentageRight: 0,
			dashOffset: 0,
			totalQuestions: null,
		};
	},

	created() {
		this.loadQuiz(window.__quiz);
	},

	methods: {
		answerQuestion(index) {
			if (this.curQuestion.isAnswered) return;

			let answer = this.curQuestion.answers[index];
			this.curQuestion.answerIdx = index;

			if (answer.isRight) {
				this.curQuestion.isRight = true;
				this.totalRight++;
			}

			this.percentageRight = (this.totalRight / this.questions.length) * 100;
			this.dashOffset = 2 * Math.PI * 54 * (1 - this.percentageRight / 100);

			this.curQuestion.isAnswered = true;
		},

		startQuiz() {
			this.totalRight = 0;
			this.curIndex = 0;
			this.loadCurQuestion();
		},

		loadCurQuestion() {
			this.curQuestion = this.questions[this.curIndex];
		},

		nextQuestion() {
			this.curIndex++;
			if (this.curIndex > this.questions.length - 1) {
				this.curIndex = -2;
				return;
			}
			this.loadCurQuestion();
		},

		prevQuestion() {
			this.curIndex--;
			this.loadCurQuestion();
		},

		loadQuiz(quiz) {
			this.questions = [];
			for (let q of quiz.questions) {
				q.isAnswered = false;
				q.isRight = false;
				q.answerIdx = null;

				this.questions.push(q);
			}
			this.totalQuestions = this.questions.length;
		},
	},
};
</script>

<style lang="scss" scoped>
.quiz {
	box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.quiz__answer__header {
	border-bottom: 1px solid rgba(10, 10, 10, 0.1);
	border-top: 1px solid rgba(10, 10, 10, 0.1);

	padding: 1rem 0.5rem;
	cursor: pointer;
}

.quiz__answer__abc {
	float: left;
	padding-left: 1em;
	font-weight: bold;
}

.quiz__answer__text {
	padding-left: 3em;
}

.quiz__answer--wrong .quiz__answer__header {
	background-color: #ffcdd2;
}

.quiz__answer--right .quiz__answer__header {
	background-color: #c8e6c9;
}

.quiz__answer__explanation {
	padding: 1rem 3rem;
	transition-property: all;
	transition-duration: 2s;
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.quiz__navigation {
	border-bottom: 1px solid rgba(10, 10, 10, 0.1);
	border-top: 1px solid rgba(10, 10, 10, 0.1);

	a {
		border-right: 1px solid rgba(10, 10, 10, 0.1);
		padding: 0.5em;
		display: inline-block;
	}
}

.quiz__score {
	text-align: center;
}

.quiz__question {
	border-bottom: 1px solid rgba(10, 10, 10, 0.1);

	padding: 1.5rem 1rem;

	font-weight: bold;
}

.quiz__question__subheader {
	font-weight: lighter;
	font-size: 80%;
}

.quiz__boxwrap {
	max-width: 800px;
	margin: 0 auto;
}

.progress {
	transform: rotate(-90deg);
}

.progress__meter,
.progress__value {
	fill: none;
}

.progress__meter {
	stroke: #e6e6e6;
}

.progress__value {
	stroke: #f77a52;
	stroke-linecap: round;
}
</style>
