<template>
    <div>
        <div class="heading">
            <h1 class="title">Отклик {{id}}</h1>
        </div>

        <div class="response-wrap" v-if="questionResponses.length">
            <div class="question-item" v-for="question in questionResponses">
                {{question}}
            </div>
        </div>
    </div>
</template>

<script>
  import { Response } from '../../api';

  export default {
    name: 'responses',
    data() {
      return {
        questionResponses: {}
      };
    },
    computed: {
      id() {
        return this.$route.params.responseId;
      }
    },
    created() {
      this.$title('Отклики');
      Response.getResponses(this.id)
        .then(res => {
          this.questionResponses = res.data;
        });
    }
  };
</script>