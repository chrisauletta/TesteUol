<template>
  <div class="grid flex-aling-center">
    <div class="content">
      <div class="content-title flex-aling-center">
        <h2>{{ content.title }}</h2>
      </div>
      <div class="content-description" v-if="content.description">
        <p>
          {{ content.description }}
        </p>
      </div>
      <div
        class="grid flex-aling-center"
        v-if="content.embeddable || !content.description"
      >
        <div class="content-embeddable">
          <iframe
            width="420"
            height="315"
            v-if="content.type == 'video' || content.type == 'document'"
            :src="content.url"
          >
          </iframe>
          <img
            :src="content.url"
            v-if="content.type == 'image'"
            width="420"
            height="420"
          />
          <a :href="content.url">{{ content.url }}</a>
        </div>
      </div>
      <div class="content-download" v-if="content.allow_download">
        <button
          class="btn btn-primary"
          @click="fileDownload(content.url, content.title)"
        >
          Download
        </button>
      </div>
      <div class="content-footer">
        <button class="btn btn-red" @click="$router.push('/contents')">
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contents",
  data() {
    return {
      content:{},
    };
  },

  created() {
		this.getContents();
  },

  methods: {
		async getContents(){
			try {
				var query = {
					query: `
						{
							getContent(id: "${this.$route.params.id}"){
									title,
									description
									type
									url
									embeddable
									allow_download
									created_at
							}
						}
					`,
				};
				const response = await this.$axios.$post(
					"https://us-central1-challenge-334613.cloudfunctions.net/api/graphql",
					query
				);
				this.content = response.data.getContent;
			} catch (err) {
				this.$router.push("/contents");
				this.$toast.error("Erro ao efetuar a busca", { duration: 2000 });
				console.log(err);
			}
		},
    fileDownload(file, title) {
      this.$axios.get(file, { responseType: "blob" }).then((response) => {
        var blob = new Blob([response.data]);
        var url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", title + ".jpg");
        document.body.appendChild(link);
        link.click();
      });
    },
  },
};
</script>
