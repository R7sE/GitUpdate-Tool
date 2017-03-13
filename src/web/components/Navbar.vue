<template>
    <nav class="Navbar-Component navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="#" class="navbar-brand">Git Tool</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
                <ul class="nav navbar-nav">
                    <li :class="{active: routerPath === menu.to}" v-for="menu in menus">
                        <router-link :to="menu.to">{{ menu.label }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        computed: {
            menus () {
                return [
                    {to: '/', label: 'Home'},
                    {to: '/repository', label: 'Repository'},
                ]
            }
        }
    };
</script>