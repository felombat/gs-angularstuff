import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEbook } from './ebook';
import { EbookService } from './ebook.service';

@Component({
  selector: 'pm-ebook-detail',
  templateUrl: './ebook-detail.component.html'
  
})
export class EbookDetailComponent implements OnInit {
  pageTitle = 'Ebook Detail';
  errorMessage = '';
  ebook: IEbook | undefined;

  myEbook: IEbook = {
                  ebookId:12 , 
                  basename: "Andrew_Pressman_-_Design_Thinking__A_Guide_to_Creative_Problem_Solving_for_Everyone_(2018,_Routledge)",
                  title: "_Design_Thinking__A_Guide_to_Creative_Problem_Solving_for_Everyone_(2018,_Routledge)",
                  author: "Andrew_Pressman_",
                  filesize: "3.81M",
                  extension: "pdf",
                  imgUrl : 'http:\/\/fueldemoapp.test\/uploads\/thumbnails\/Andrew_Pressman_-_Design_Thinking__A_Guide_to_Creative_Problem_Solving_for_Everyone_(2018,_Routledge)-000001.png',
                  fileUrl : 'http:\/\/fueldemoapp.test\/files\/eLib\/Andrew_Pressman_-_Design_Thinking__A_Guide_to_Creative_Problem_Solving_for_Everyone_(2018,_Routledge).pdf'
                };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ebookService: EbookService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEbook(id);
    }
  }

  getEbook(id: number): void {
    this.ebookService.getEbook(id).subscribe({
      next: ebook => this.ebook = ebook,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/ebooks']);
  }

}
