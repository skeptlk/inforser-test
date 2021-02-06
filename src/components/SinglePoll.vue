<template>
<v-container>
    <v-row>
        <v-col md="6" offset-md="3">
            <DeletePoll 
                v-if="!isNew"
                :poll="poll" />
            <router-link to="/" tag="div">
                <v-btn color="normal"> Назад </v-btn>
            </router-link>
        </v-col>
    </v-row>
    <v-row>
        <v-col md="6" offset-md="3">
            <v-alert v-if="globalError" dense outlined type="error">
                {{ globalError }}
            </v-alert>
            <v-text-field
                v-model="poll.firstname"
                :error-messages="firstNameErrors"
                label="Имя"
                required
                @input="$v.poll.firstname.$touch()"
                @blur="$v.poll.firstname.$touch()">
            </v-text-field>
            
            <v-text-field
                v-model="poll.lastname"
                :error-messages="lastNameErrors"
                label="Фамилия"
                required
                @input="$v.poll.lastname.$touch()"
                @blur="$v.poll.lastname.$touch()">
            </v-text-field>

            <v-text-field
                v-if="isNew"
                v-model="poll.email"
                :error-messages="emailErrors"
                label="Email"
                required
                @input="$v.poll.email.$touch()"
                @blur="$v.poll.email.$touch()">
            </v-text-field>

            <v-text-field
                v-if="isNew"
                v-model="poll.password"
                :error-messages="passwordErrors"
                label="Пароль" 
                type="password"
                required
                @input="$v.poll.password.$touch()"
                @blur="$v.poll.password.$touch()">
            </v-text-field>

            <v-radio-group v-model="poll.likesKittens">
                <template v-slot:label>
                    Любите ли вы котиков?
                </template>
                <v-radio :value="true">
                    <template v-slot:label>
                        Да 😄
                    </template>
                </v-radio>
                <v-radio :value="false">
                    <template v-slot:label>
                        Нет 😠
                    </template>
                </v-radio>
            </v-radio-group>

            <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="poll.birthdate"
                        label="Дата рождения"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs" v-on="on"
                        :error-messages="birthdateErrors"
                        @input="$v.poll.lastname.$touch()"
                        @blur="$v.poll.lastname.$touch()">
                    </v-text-field>
                </template>
                <v-date-picker
                    v-model="poll.birthdate">
                </v-date-picker>
            </v-menu>

            <v-file-input
                :error-messages="catPictureErrors"
                v-model="poll.catPicture"
                show-size
                label="Фотография"
                truncate-length="40"
                accept=".jpg, .jpeg"
                @input="$v.poll.catPicture.$touch()"
                @blur="$v.poll.catPicture.$touch()">>
            </v-file-input>

            <v-text-field
                v-if="!isNew"
                v-model="passwordToEdit"
                label="Пароль для редактирования опроса" 
                type="password"
                @input="$v.poll.password.$touch()"
                @blur="$v.poll.password.$touch()">
            </v-text-field>

            <v-btn
                :loading="loading"
                :disabled="loading"
                color="primary"
                x-large
                class="float-right"
                @click="submit">
                {{ isNew ? 'Сохранить' : 'Обновить'}}
            </v-btn>

        </v-col>
    </v-row>
</v-container>
</template>

<script>
import DeletePoll from './DeletePoll';
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';

// Vuelidate не поддерживает валидацию файлов
// поэтому я написал кастомные функции для валидации
import { maxFileSize, allowedExtensions } from './../helpers/validators';


export default {
    name: 'SinglePoll',
    mixins: [validationMixin],
    components: { DeletePoll },

    data() { 
        return {
            isNew : true,
            loading : false,
            globalError: '',
            passwordToEdit: '',
            poll: {}
        }
    },

    mounted() {
        this.isNew = !this.$route.params.email;
        if (!this.isNew) {
            let poll = this.$store.getters.pollByEmail(this.$route.params.email);
            if (!poll) {
                this.$router.push("/newpoll");
            } else this.poll = poll;
        } else {
            this.poll = {
                firstname: "",
                lastname: "",
                likesKittens: true,
                birthdate: null,
                catPicture: null,
                email: "",
                password: ""
            }
        }
    },

    computed: {
        firstNameErrors () {
            const errors = [];
            if (!this.$v.poll.firstname.$dirty) return errors;
            !this.$v.poll.firstname.required && errors.push('Это обязательное поле');
            return errors;
        },
        lastNameErrors () {
            const errors = [];
            if (!this.$v.poll.lastname.$dirty) return errors;
            !this.$v.poll.lastname.required && errors.push('Это обязательное поле');
            return errors;
        },
        birthdateErrors () {
            const errors = [];
            if (!this.$v.poll.birthdate.$dirty) return errors;
            !this.$v.poll.birthdate.required && errors.push('Это обязательное поле');
            return errors;
        },
        catPictureErrors () {
            const errors = [];
            if (!this.$v.poll.catPicture.$dirty) return errors;
            !this.$v.poll.catPicture.allowedExtensions && errors.push('Пожалуйста, загрузите изображение в формате jpeg');
            !this.$v.poll.catPicture.maxFileSize && errors.push('Размер изображения не должен превышать 5 МБ');
            return errors;
        },
        emailErrors () {
            const errors = [];
            if (!this.$v.poll.email.$dirty) return errors;
            !this.$v.poll.email.required && errors.push('Это обязательное поле');
            !this.$v.poll.email.email && errors.push('Введите правильный email адрес');
            return errors;
        },
        passwordErrors () {
            const errors = [];
            if (!this.$v.poll.password.$dirty) return errors;
            !this.$v.poll.password.required && errors.push('Это обязательное поле');
            !this.$v.poll.password.minLength && errors.push('Длина пароля должна быть не меньше 8 символов');
            return errors;
        }
    },

    methods: {
        submit () {
            this.$v.$touch();

            console.log(this.$v);

            if (!this.$v.invalid) {
                this.loading = true;
                const action = (this.isNew) ? "createPoll" : "updatePoll";
                const data = (this.isNew) ? this.poll : { poll: this.poll, password: this.passwordToEdit };
                this.$store
                    .dispatch(action, data)
                    .then(() => {
                        this.loading = false;
                        this.$router.push('/');
                    })
                    .catch((err) => {
                        this.loading = false;
                        if (err === "Incorrect password") {
                            this.globalError = "Неверный пароль";
                        } else if (err === "Duplicate email") {
                            this.globalError = "Опрос по такому адресу уже существует. Введите пароль чтобы отредактировать.";
                            this.isNew = false;
                        }
                    }); 
            }
        },
    },

    validations: {
        poll: {
            firstname: { required },
            lastname: { required },
            birthdate: { required },
            likesKittens: { required },
            email: { required, email },
            password: {
                required,
                minLength: minLength(8)
            },
            catPicture: {
                allowedExtensions: allowedExtensions(["jpg", "jpeg"]),
                maxFileSize: maxFileSize(5), // размер изображения не больше 5 мегабайт
            }
        }
    },

}
</script>
