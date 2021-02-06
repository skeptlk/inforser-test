<template>
<v-dialog
    v-model="dialog"
    persistent
    max-width="290">
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            color="error"
            class="float-right">
            <v-icon dark left>mdi-delete</v-icon>
            Удалить
        </v-btn>
    </template>
    <v-card>
        <v-card-title>
            Удалить этот опрос?
        </v-card-title>
        <v-card-text>
             <v-text-field
                label="Пароль"
                v-model="password"
                :error-messages="errors"
                type="password">
            </v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="normal" text
                :disabled="loading"
                @click="dialog = false">
                Отмена
            </v-btn>
            <v-btn color="error" text
                :disabled="loading"
                :loading="loading"
                @click="deletePoll">
                Удалить
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'DeletePoll',
    props: ["poll"],

    data: () => ({
        dialog: false,
        password: '',
        loading: false,
        errors: [],
    }),
    
    methods: {
        deletePoll() {
            this.loading = true;
            this.$store
                .dispatch("deletePoll", { 
                    poll: this.poll,
                    password: this.password
                })
                .then(() => {
                    this.$router.push('/');
                })
                .catch(() => {
                    this.loading = false;
                    this.errors = ['Неверный пароль'];
                });
        }
    }
}
</script>

<style>

</style>