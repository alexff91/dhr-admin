<template>
    <div>
        <div class="heading">
            <input class="heading-input" v-model="company.name">

        </div>
        <wysiwyg class="vacancy-description" v-model="company.description"></wysiwyg>
        <h3>Лого:</h3>
        <div class="logo-preview" ref="logo-preview">
            <img v-if="company.logo && !newLogoSrc" :src="company.logo">
            <img v-if="newLogoSrc" :src="newLogoSrc">
        </div>
        <input type="file" class="" @change="onFileSelect" accept=".jpg, .jpeg, .png, .svg">
        <br>
        <el-button class="save-button" type="primary" @click="updateCompany">Сохранить</el-button>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { Companies } from '../../api';

  export default {
    name: 'company-settings',
    data() {
      return {
        newLogoSrc: ''
      };
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
      ...mapActions({
        setCompany: 'setCompany'
      }),
      updateCompany() {
        let updatedCompany = this.company;

        if (this.newLogoSrc) {
          updatedCompany = {
            ...this.company,
            logo: this.newLogoSrc
          };
        }

        this.setCompany(updatedCompany);
        Companies.put(this.company.id, updatedCompany);
      },
      onFileSelect(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          this.newLogoSrc = reader.result;
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