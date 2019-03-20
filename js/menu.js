/**
 * @class MenuItem
 * @classdesc Describe a Tetr.io MenuItem
 */
class MenuItem
{
    constructor(data)
    {
        this.containerID = "menu";
        this.container  = document.querySelector("#"+this.containerID);

        this.link       = data.link;
        this.label      = data.label;
        this.caption    = data.caption;

        this.template   = document.querySelector("#menu-item--template");
    }


    draw()
    {
        var clone = document.importNode(this.template.content, true);
        
        var a = clone.querySelector(".menu-item-link");
        a.href  = this.link;
        a.innerHTML = this.label;
        
        var p = clone.querySelector(".menu-item-caption");
        p.innerHTML = this.caption;

        this.container.appendChild(clone);
    }
}