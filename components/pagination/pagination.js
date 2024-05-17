let template = document.createElement('template');
template.innerHTML =`
<div class="pagination">
    <ul class="pagination-list">
        <li class="pagination-item">
            <a href="" class="pagination-link">
            <i class="fas fa-arrow-right pagination-icon"></i>
            </a>
        </li>

        <li class="pagination-item">
            <a href="" class="pagination-link pagination-link--active">
                1
            </a>
        </li>

        <li class="pagination-item">
            <a href="" class="pagination-link">
                2
            </a>
        </li>

        <li class="pagination-item">
            <a href="" class="pagination-link">
                3 
            </a>
        </li>

        <li class="pagination-item">
            <a href="" class="pagination-link">
                <i class="fas fa-arrow-left pagination-icon"></i>
            </a>
        </li>
    </ul>
</div>
`

class Pagination extends HTMLElement{
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true))
    }
}

export {Pagination}