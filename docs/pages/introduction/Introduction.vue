<script setup>

</script>

<template>
    <div class="wrapper">
        <div class="list-cont">
            <a style="--color:#127436;" 
            href="../front_end/index" 
            class="item">
                <div class="tit">WEB前端</div>
                <div class="bgtext">Front End <br>Development</div>
            </a>
            <a style="--color:#990036;" 
            href="../back_end/index" 
            class="item">
                <div class="tit">后端开发</div>
                <div class="bgtext">Back End <br>Development</div>
            </a>
            <a style="--color:#8b4513;" 
            href="../computer/index" 
            class="item">
                <div class="tit">计算机</div>
                <div class="bgtext">Computer <br>Science</div>
            </a>
            <!-- <a style="--color:#ff7300;" 
            href="../language/index" 
            class="item">
                <div class="tit">编程语言</div>
                <div class="bgtext">Programming <br>Language</div>
            </a> -->
            <a style="--color:#4169e1;" 
            href="../games/index" 
            class="item">
                <div class="tit">游戏开发</div>
                <div class="bgtext">Game <br>Production</div>
            </a>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    margin-top: 20px;
    position: relative;
    width: 100%;
}

.list-cont {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item {
    position: relative;
    margin-bottom: 4%;
    width: 48%;
    height: 200px;
    background-color: var(--color);
    border-radius: 8px;
    text-decoration: none;
    overflow: hidden;
    /* box-shadow: var(--vp-shadow-2); */
    transition: transform 0.3s ease;
}

.item:hover {
    transform: translate(4px, -4px);
}

.tit {
    padding: 8px;
    font-size: 20px;
    letter-spacing: 2px;
    line-height: 1.2;
    text-decoration: none;
    color: #ffffff;
    opacity: 0.7;
}

.bgtext {
    position: absolute;
    bottom: -4px;
    right: -4px;
    font-size: 32px;
    line-height: 1.2;
    letter-spacing: 2px;
    color: #ffffff;
    opacity: 0.3;
    text-align: right;
}

@media screen and (max-width: 720px) {
    .item {
        width: 100%;
    }
}
</style>
