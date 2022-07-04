<template>
  <div class="grid flex-aling-center">
    <div class="card" v-for="(item, index) in contents" :key="index">
      <div class="card-title">
        <h4>{{ item.title }}</h4>
      </div>
      <div class="card-footer">
        <nuxt-link :to="'/contents/' + item.id">
          <button class="btn btn-primary">Detalhes</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contents",

  async asyncData({ $axios, $toast }) {
    var contents = [];
    try {
      var query = {
        query: `
          {
            contents{
              id
              title
              description
              type
              url
              embeddable
              allow_download
            }
          }
        `,
      };

      const response = await $axios.$post(
        "https://us-central1-challenge-334613.cloudfunctions.net/api/graphql",
        query
      );

      var contents = response.data.contents;
    } catch (err) {
      $toast.error("Erro ao efetuar a busca", { duration: 2000 });
      console.log(err);
    }

    return {
      contents,
    };
  },
};
</script>
