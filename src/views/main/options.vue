<template>
    <div>
        <div class="heading">
            <h1 class="title">{{ title }}</h1>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'options',

    computed: {
      title() {
        const dist = {
          general: 'Настройки',
          writing: '撰写设置',
          reading: '阅读设置',
          discussion: '讨论设置'
        };
        return dist[this.$route.params.type];
      }
    }
  };
</script>
