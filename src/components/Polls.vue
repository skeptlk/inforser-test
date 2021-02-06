<template>
    <v-container>
        <v-row>
            <v-col class="mb-4 mt-2">
                <router-link to="/newpoll"
                    tag="div">
                    <v-btn 
                        elevation="2"
                        color="primary"
                        x-large
                        class="float-right">
                        <v-icon dark left >mdi-plus</v-icon>
                        Новый опрос
                    </v-btn>
                </router-link>
                <h1 class="display-1">
                    Все опросы:
                </h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-list-item-group>
                    <router-link 
                        v-for="(poll, i) in polls" :key="i"
                        :to="'/poll/' + poll.email"
                        tag="div">
                        <v-list-item>
                            <v-list-item-title>
                                {{ poll.firstname + " " + poll.lastname }}
                            </v-list-item-title>
                            <v-list-item-icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </router-link>
                </v-list-item-group>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Polls",

    data: () => ({}),

    computed: {
        polls () { return this.$store.getters.polls }
    }
};
</script>
