<template>
    <div>
        <div class="heading">
            <input class="heading-input" v-model="company.name">

        </div>
        <wysiwyg class="vacancy-description" v-model="company.description"></wysiwyg>
        <h3>Лого:</h3>
        <div class="logo-preview" ref="logo-preview">
            <img v-if="company.logo" :src="company.logo">
            <!--<img :src="">-->
        </div>
        <input type="file" class="" @change="onFileSelect" accept=".jpg, .jpeg, .png, .svg">
        <br>
        <el-button class="save-button" type="primary" @click="updateCompany">Сохранить</el-button>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { Companies } from '../../api';

  export default {
    name: 'company-settings',
    data() {
      return {};
    },
    computed: mapGetters({
      company: 'company'
    }),
    created() {
      if (!this.company) {
        this.$store.dispatch('getUserAndCompany');
      }

      this.$title('Настройки компании');
    },
    methods: {
      updateCompany() {
        Companies.put(this.company.id, this.company);
      },
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

<style lang="scss" scoped>
    .logo-preview img {
        max-width: 175px;
        max-height: 80px;
    }

    .save-button {
        float: right;
    }
</style>