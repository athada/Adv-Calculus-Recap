import { BaseTopicModule } from '@/content/curriculum/topics/BaseTopicModule';
import { InteractiveMapsDiagram } from './diagrams/InteractiveMapsDiagram';
import { InteractiveRelationsDiagram } from './diagrams/InteractiveRelationsDiagram';
import { InteractiveSetsDiagram } from './diagrams/InteractiveSetsDiagram';
import { setTheorySubtopics } from './subtopics';

class SetTheoryModule extends BaseTopicModule {
  readonly topicId = 'sets_maps';
  readonly topicTitle = 'Set Theory & Mappings';
  readonly defaultSubtopicId = 'sets';
  readonly subtopics = setTheorySubtopics;

  protected readonly diagramComponents = {
    sets: InteractiveSetsDiagram,
    relations: InteractiveRelationsDiagram,
    maps: InteractiveMapsDiagram,
  };
}

export const setTheoryModule = new SetTheoryModule();
