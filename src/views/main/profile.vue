<template>
    <section class="page">
        olololo
    </section>
</template>

<script>
  export default {
    name: 'profile'
  };
</script>

<style lang="scss">
    .page {
        margin: 50px;
        padding: 20px 40px;
        background-color: #fff;
        box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);

        > hgroup {
            > .title {
                margin: .3125rem 0;

                > a {
                    display: inline-block;
                    text-decoration: none;
                    font-size: 2rem;
                    color: #515151;
                }
            }

            > .heading {
                margin: 0;
                font-weight: normal;
                font-size: 13px;
                color: #757575;
            }
        }
    }

    .panel {
        margin-top: 1.25rem;

        > .heading {
            margin: 0;
            padding-left: .3125rem;
            font-size: 1.5rem;
            border-bottom: .0625rem solid #e0e0e0;
        }

        > .content {
            padding: .5rem;

            h3, h4, h5 {
                margin: 0;
            }

            ul, ol {
                margin: 0;
                padding: 0;
                padding-left: 1.25rem;
                line-height: 36px;
            }

            .two-column {
                column-count: 2;
            }

            span {
                display: inline-block;
                width: 33%;
            }

            p {
                margin: .5rem 0;
                text-indent: 2em;
            }
        }
    }
</style>
