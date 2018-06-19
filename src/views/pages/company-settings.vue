<template>
    <div>
        <div class="heading">
            <input class="heading-input" v-model="company.name">
        </div>

        {{company}}

        <div class="logo-preview" ref="logo-preview">
            <!--<img :src="">-->
        </div>

        <input type="file" @change="onFileSelect" accept=".jpg, .jpeg, .png, .svg">


    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'skills',
    data() {
      return {};
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      if (!this.company) {
        this.$store.dispatch('getUserAndCompany')
          .then(this.getSkills);
      } else {
        this.getSkills();
      }

      this.$title('Настройки компании');

    },
    methods: {
      setImg(base64) {
        let img = document.createElement('img');
        img.src = base64;
        this.$refs['logo-preview'].appendChild(img);
      },

      onFileSelect(e) {
        const logoPreview = this.$refs['logo-preview'];
        while (logoPreview.firstChild) {
          logoPreview.removeChild(logoPreview.firstChild);
        }

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          this.setImg(reader.result);
        };
      }
    }
  };
</script>

<style lang="scss">
    .logo-preview img {
        max-width: 175px;
        max-height: 80px;
    }
</style>