import { Component, OnInit, ViewChild } from '@angular/core';
import { Family } from 'src/app/models/family';
import { FamilyService } from 'src/app/services/family.service';
import { Edge, Node } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-rca',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.css'],
})
export class RcaComponent implements OnInit {
  families: Family[] | any;
  public nodes: Node[] = [];
  public links: Edge[] = [];

  constructor(private familyService: FamilyService) {
    this.familyService.familyDetail.subscribe((x) => (this.families = x));
  }

  ngOnInit(): void {
    var nodeArray: Node[] = [];
    var linkArray: Edge[] = [];

    this.families.forEach((item: Family) => {
      nodeArray.push({
        id: item?.relation,
        label: item?.name,
      });

      if (
        item?.relation == 'Mother' ||
        item?.relation == 'Father' ||
        item?.relation == 'Mother-in-Law' ||
        item?.relation == 'Father-in-Law'
      ) {
        linkArray.push({
          id: item?.id,
          source: 'Base Node',
          target: item?.relation,
          label: item?.name,
        });
      } else if (item?.relation == 'Brother') {
        linkArray.push({
          id: item?.id,
          source: 'Father',
          target: item?.relation,
          label: item?.name,
        });
      } else if (item?.relation == 'Sister') {
        linkArray.push({
          id: item?.id,
          source: 'Mother',
          target: item?.relation,
          label: item?.name,
        });
      } else if (item?.relation == 'Son') {
        linkArray.push({
          id: item?.id,
          source: 'Father-in-Law',
          target: item?.relation,
          label: item?.name,
        });
      } else if (item?.relation == 'Wife') {
        linkArray.push({
          id: item?.id,
          source: 'Son',
          target: item?.relation,
          label: item?.name,
        });
      }
    });

    this.links = linkArray;
    this.nodes = nodeArray;
  }
}
