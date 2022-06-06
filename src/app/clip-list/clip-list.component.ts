import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { worker } from 'cluster';
import { off } from 'process';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit, OnDestroy {

  constructor(public clipService: ClipService ) {
    this.clipService.getClips()
   }

  ngOnInit(): void {
    window.addEventListener('scroll',this.handleScroll)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll',this.handleScroll)
  }

  handleScroll = () => {
    const {scrollTop, offsetHeight} = document.documentElement
    const {innerHeight} = window
    const bottowOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
    if(bottowOfWindow){
      this.clipService.getClips()
    }
    
  }

}
