module.exports ={
    seleccionarSkills: (seleccionadas = [], opciones) =>{
        const skills = ['HTML5','CSS3','CSSGrid','FlexBox','JavaScript','jQuery','Node','Angular',
        'VueJs','ReactJS','React Hooks','Redux','Apollo','GraphQL','TypeScript','PHP','Laravel','Symfony',
        'Python','Django','ORM','Sequelize','Mongoose','SQL','MVC','SASS','WordPress'];

        let html = '';
        skills.forEach(skill =>{
            html +=`
                <li ${seleccionadas.includes(skill) ? 'class="activo"' : ''}>${skill}</li>
            `;
        });
        
        return opciones.fn().html = html;
    }
}