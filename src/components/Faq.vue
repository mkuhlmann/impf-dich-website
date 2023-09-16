<template>
	<div>
		<input class="w-full" type="text" v-model="filterString" placeholder="Filtern ..." />
		<div v-for="q in filteredQuestions">
			<div class="mb-4 rounded-md shadow">
				<a class="block bg-gray-100" v-on:click="q.open = !q.open">
					<p class="p-3 text-black font-bold" v-html="q.q"></p>
					<span class="card-header-icon" v-show="filteredQuestions.length >= 4">
						<span class="icon">
							<i class="mdi" v-bind:class="{ 'mdi-chevron-down': !q.open, 'mdi-chevron-up': q.open }"></i>
						</span>
					</span>
				</a>
				<div class="px-5 pb-1" v-html="q.a" v-show="q.open || filteredQuestions.length < 4"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			questions: [],
			filteredQuestions: [],
			filterString: '',
		};
	},
	created() {
		var self = this;

		var faq = [];
		var html = document.querySelector('#faq-content');
		for (var i = 0; i < html.children.length; i++) {
			if (html.children[i].tagName == 'BLOCKQUOTE') {
				var q = {
					q: html.children[i].innerText,
					a: '',
				};
				i++;
				for (; i < html.children.length && html.children[i].tagName != 'BLOCKQUOTE'; i++) {
					q.a += html.children[i].outerHTML;
				}
				i--;

				faq.push(q);
			}
		}
		html.remove();

		faq.forEach(function (item) {
			item.open = false;
			self.questions.push(item);
		});
		this.filteredQuestions = this.questions;

		function escapeRegex(s) {
			return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		}

		this.$watch('filterString', function () {
			var filterString = this.filterString;
			if (filterString == '') {
				this.filteredQuestions = this.questions;
				return;
			}

			var re = new RegExp(escapeRegex(filterString), 'ig');
			this.filteredQuestions = this.questions.filter(function (q) {
				return q.q.match(re) !== null || q.a.match(re) !== null;
			});
		});
	},
};
</script>
