<template>
    <div>
        <section class="error">
            <h1>404</h1>
            <h2>Упс! Вы попали не туда</h2>
            <footer>
                <router-link :to="'/'">Вернуться на главную</router-link>
            </footer>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'not-found',
        title: 'Упс! Что-то пошло не туда'
    };
</script>

<style lang="scss">
    .error {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        letter-spacing: .125rem;

        h1 {
            font-size: 15rem;
        }

        footer {
            margin-top: 5rem;
            font-size: .75rem;
        }
    }
</style>
